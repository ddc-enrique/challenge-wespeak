'use client'

import { useState, useEffect } from 'react'

interface CounterState {
  id: number,
  value: number,
  createdAt: Date,
  updatedAt: Date
}

export default function Counter() {
  const [counter, setCounter] = useState<CounterState>({
    id: 0,
    value: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [updating, setUpdating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreatedAt, setShowCreatedAt] = useState<boolean>(false)

  // Fetch initial counter value
  useEffect(() => {
    fetchCounter()
  }, [])

  const fetchCounter = async () => {
    try {
      const response = await fetch('/api/counter')

      if (!response.ok) {
        throw new Error('Failed to fetch counter')
      }
      
      const data = await response.json()
      setCounter(data)
    } catch (error) {
      console.error('Error fetching counter:', error)
      setError('Error al obtener el contador')
    } finally {
      setLoading(false)
    }
  }

  const updateCounter = async (action: 'increment' | 'decrement') => {
    setUpdating(true)
    try {
      const response = await fetch('/api/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, id: counter.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to update counter')
      }
      
      const data = await response.json()
      setCounter(data)
    } catch (error) {
      console.error('Error updating counter:', error)
      setError('Error al actualizar el contador')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Contador Persistente
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Los valores se guardan automáticamente en la base de datos
        </p>
        
        {/* Counter Display */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {counter.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Último valor actualizado el: {new Date(counter.updatedAt).toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => updateCounter('decrement')}
            disabled={updating}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center min-w-[120px] cursor-pointer"
          >
            {updating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="text-xl mr-2">−</span>
                Disminuir
              </>
            )}
          </button>
          
          <button
            onClick={() => updateCounter('increment')}
            disabled={updating}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center min-w-[120px] cursor-pointer"
          >
            {updating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="text-xl mr-2">+</span>
                Incrementar
              </>
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          {error ? (
            <span className="flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              {error}
            </span>
          ) : (
            updating ? (
            <span className="flex items-center justify-center">
              <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Guardando en base de datos...
            </span>
          ) : (
            <div className="flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"/>
                  Sincronizado
                  <button
                    className="ml-4 text-xs text-blue-500 underline focus:outline-none cursor-pointer"
                    onClick={() => setShowCreatedAt((prev: boolean) => !prev)}
                    type="button"
                  >
                    {showCreatedAt ? (
                        // Flecha hacia arriba (ocultar)
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        // Flecha hacia abajo (mostrar)
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )
                    }
                  </button>
              </div>
              {showCreatedAt && counter?.createdAt && (
                <div className="mt-2 text-xs text-gray-400">
                  Creado: {new Date(counter.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 