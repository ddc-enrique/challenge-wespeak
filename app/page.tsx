import Counter from '@/components/Counter'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center justify-left">
            <Image
              src="/logo.png"
              alt="WeSpeak Challenge"
              width={100}
              height={100}
              className="mr-4 bg-white rounded-full p-2"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              WeSpeak Challenge
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center">
            Aplicación de contador con persistencia en base de datos usando Next.js, Prisma y Supabase
          </p>
        </div>

        {/* Counter Component */}
        <Counter />

        {/* Info Section */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              🚀 Características Técnicas
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Next.js 15 con App Router
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Prisma ORM
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Supabase PostgreSQL
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Tailwind CSS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
