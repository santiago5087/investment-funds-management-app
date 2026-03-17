# API Backend con json-server

Este proyecto usa `json-server` para proporcionar una API REST fake que funciona tanto en desarrollo local como desplegada en Vercel como serverless function.

## Desarrollo Local

### Ejecutar solo la API:
```bash
npm run api
```
La API estará disponible en: `http://localhost:3000/api`

### Ejecutar Angular + API juntos:
```bash
npm run dev
```

## Endpoints Disponibles

- `GET /api/funds` - Obtener todos los fondos
- `GET /api/funds/:id` - Obtener un fondo por ID
- `POST /api/funds` - Crear un nuevo fondo
- `PUT /api/funds/:id` - Actualizar un fondo
- `PATCH /api/funds/:id` - Actualizar parcialmente un fondo
- `DELETE /api/funds/:id` - Eliminar un fondo

Lo mismo aplica para `/api/transactions` y `/api/subscriptions`

## Despliegue en Vercel

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Iniciar sesión en Vercel:
```bash
vercel login
```

3. Desplegar:
```bash
vercel
```

4. Actualizar `src/environments/environment.ts` con la URL de producción:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://TU-PROYECTO.vercel.app/api'
};
```

## Estructura de Archivos

- `db.json` - Base de datos JSON con los datos
- `api/index.js` - Serverless function para Vercel
- `api/routes.json` - Configuración de rutas para json-server
- `vercel.json` - Configuración de despliegue en Vercel

## Agregar Datos

Edita el archivo `db.json` para agregar, modificar o eliminar datos. Los cambios se reflejarán automáticamente en desarrollo.
