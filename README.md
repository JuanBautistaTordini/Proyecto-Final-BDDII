# 🎟️ Sistema de Gestión de Eventos y Tickets con QR

Este proyecto permite la gestión de eventos, compra de tickets y validación mediante código QR usando Node.js, Express y MongoDB (Mongoose).

## 🚀 Características

- Crear eventos con múltiples tipos de ticket
- Listar eventos próximos
- Comprar tickets con generación de código QR
- Validar tickets por código QR
- Generar reportes de ventas por evento

## 📦 Requisitos

- Node.js v18+
- MongoDB local o remoto (Atlas)

## ⚙️ Instalación

```bash
git clone 
cd backend
npm install
cp .env.example .env
Editá el .env con tus credenciales:
```

- Editar el .env con tus credenciales:

```bash 
PORT=3001
MONGO_URI=mongodb://localhost:27017/eventos-ticket
```

## 🚀 Ejecución

- 🧪 Inicializar base de datos
```bash
cd backend
node init/initDB.js
```

- ▶️ Ejecutar servidor

```bash
cd backend
npm run dev
```

- 📦 Instalar dependencias del frontend

```bash
cd frontend
npm install
```

- ▶️ Ejecutar frontend

```bash
npm start
```

## 📚 Documentación 

- 📁 Colección Postman
- Incluida en <a href="./backend/examples/PROYECTOFINAL-BDDII.postman_collection.json">POSTMAN JSON</a>