# WeSpeak Challenge - Contador Persistente

Una aplicación web sencilla desarrollada con Next.js que implementa un contador con persistencia en base de datos relacional usando Supabase y Prisma ORM.

## 🚀 Características

- **Contador con Persistencia**: Contador que muestra su valor actual en pantalla y persiste entre sesiones
- **Base de Datos Relacional**: Valores almacenados en PostgreSQL usando Supabase
- **Prisma ORM**: Gestión de base de datos con Prisma para TypeScript
- **UI Moderna**: Interfaz de usuario moderna y responsiva con Tailwind CSS
- **API Routes**: Endpoints RESTful para operaciones del contador
- **Tiempo Real**: Actualización inmediata en base de datos al hacer clic en los botones

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Estilos**: Tailwind CSS v4
- **Deployment**: Optimizado para Vercel

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ y npm
- Cuenta de Supabase (gratuita)

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd challenge-wespeak
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

1. Crear el archivo de ejemplo:
```bash
cp .env
```
2. Consultar con ddc.enrique@gmail.com  para obtener las siguientes variables 
```
DIRECT_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🗃️ Estructura de la Base de Datos

### Tabla Counter

```prisma
model Counter {
  id        Int      @id @default(autoincrement())
  value     Int      @default(0)
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}
```

## 🔄 API Endpoints

### GET /api/counter

Obtiene el valor actual del contador.

**Respuesta:**
```json
{
  "id": 1,
  "value": 0,
  createdAt: Date,
  updatedAt: Date
}
```

### POST /api/counter

Actualiza el valor del contador.

**Body:**
```json
{
  "action": "increment" | "decrement",
  "id": number
}
```

**Respuesta:**
```json
{
  "id": 1,
  "value": 0,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Contador con Persistencia
- [x] Muestra el valor actual en pantalla
- [x] Valor almacenado en base de datos PostgreSQL
- [x] Persistencia entre sesiones del navegador
- [x] Botón de incrementar (+1)
- [x] Botón de disminuir (-1)

### ✅ Persistencia de Datos
- [x] Actualización inmediata en base de datos
- [x] Manejo de errores
- [x] Estados de carga (loading/updating)
- [x] Indicadores visuales del estado


## 🧪 Testing

Para probar la persistencia:

1. Abre la aplicación en el navegador
2. Incrementa/disminuye el contador
3. Recarga la página - el valor debe persistir
4. Comprobar que la fecha de creado del contador no se mayor a 20 minutos
5. Abre en otra pestaña/ventana - mismo valor
6. Prueba en diferentes navegadores

## 📁 Estructura del Proyecto

```
challenge-wespeak/
├── app/
│   ├── api/counter/
│   │   └── route.ts          # API endpoints del contador
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   └── Counter.tsx          # Componente del contador
├── lib/
│   └── prisma.ts           # Cliente de Prisma
├── prisma/
│   └── schema.prisma       # Esquema de la base de datos
├── .env.example            # Variables de entorno de ejemplo
└── README.md              # Esta documentación
```

---

Desarrollado para el Challenge Tecnico de WeSpeak
