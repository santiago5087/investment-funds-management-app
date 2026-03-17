# 🚀 Guía de Despliegue en Vercel

## ✅ Pre-requisitos

1. **Cuenta en Vercel**: [vercel.com](https://vercel.com) (gratis)
2. **API Key de Resend**: Obtén una en [resend.com/api-keys](https://resend.com/api-keys)
3. **Repositorio Git**: Tu proyecto debe estar en GitHub, GitLab o Bitbucket

## 📋 Pasos para Desplegar

### 1. Preparar el Proyecto

**Ya está listo** ✅ - Los siguientes cambios ya están aplicados:
- `json-server` movido a `dependencies`
- `vercel.json` configurado correctamente
- API endpoints listos para Vercel

### 2. Conectar con Vercel

#### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Conecta tu cuenta de GitHub/GitLab/Bitbucket
3. Selecciona el repositorio `investment-funds-management-app`
4. Vercel detectará automáticamente que es un proyecto Angular

#### Opción B: Desde la Terminal (Alternativa)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Hacer login
vercel login

# Desplegar
vercel
```

### 3. Configurar Variables de Entorno

**IMPORTANTE**: Debes configurar tu API key de Resend en Vercel

1. En tu proyecto de Vercel, ve a **Settings → Environment Variables**
2. Agrega la siguiente variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Tu API key real de Resend (ej: `re_abc123...`)
   - **Environments**: Marca Production, Preview y Development

### 4. Actualizar URL en el Código

Después del primer despliegue, actualiza la URL de producción:

**Archivo**: `src/environments/environment.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-proyecto.vercel.app/api'  // ← Actualiza con tu URL de Vercel
};
```

### 5. Re-desplegar

Si usaste Opción A:
- Haz commit y push de los cambios
- Vercel re-desplegará automáticamente

Si usaste Opción B:
```bash
vercel --prod
```

## 🎯 URLs del Proyecto Desplegado

Una vez desplegado, tendrás:

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API REST**: `https://tu-proyecto.vercel.app/api/funds`
- **Email API**: `https://tu-proyecto.vercel.app/api/send-email`

## ✅ Verificar el Despliegue

### 1. Probar el Frontend
Visita: `https://tu-proyecto.vercel.app`

### 2. Probar la API
```bash
curl https://tu-proyecto.vercel.app/api/funds
```

### 3. Probar el Email Endpoint
```bash
curl -X POST https://tu-proyecto.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu-email@ejemplo.com",
    "fundName": "Fondo de Prueba",
    "amount": 50000,
    "subscriptionDate": "2024-03-17T10:00:00.000Z",
    "notificationMethod": "email"
  }'
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'json-server'"
**Causa**: Vercel no instaló las dependencias correctamente
**Solución**: 
- Verifica que `json-server` esté en `dependencies` (no en `devDependencies`)
- Re-despliega el proyecto

### Error: "Missing API key"
**Causa**: La variable de entorno `RESEND_API_KEY` no está configurada
**Solución**:
- Ve a Settings → Environment Variables en Vercel
- Agrega `RESEND_API_KEY` con tu API key real
- Re-despliega (Deployments → ⋯ → Redeploy)

### Los emails no se envían
**Causa**: API key inválida o no configurada
**Solución**:
- Verifica en Vercel Dashboard → Settings → Environment Variables
- La key debe empezar con `re_` y tener caracteres aleatorios
- Asegúrate de marcar los 3 environments (Production, Preview, Development)

### Error 404 en rutas de Angular
**Causa**: Configuración de rutas en Vercel
**Solución**: Ya está configurado en `vercel.json`, pero si persiste agrega:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### El JSON Server no persiste datos
**Nota**: Esto es **esperado** en Vercel. Los serverless functions son **stateless**.
- Cada request carga `db.json` desde el filesystem
- Los cambios se pierden después de cada ejecución
- Para persistencia real, necesitarías una base de datos (MongoDB, PostgreSQL, etc.)

## 🔄 Despliegues Automáticos

Vercel desplegará automáticamente cada vez que hagas push a:
- **main/master branch** → Production
- **Otras branches** → Preview Deployments

## 📊 Monitoreo

En el Dashboard de Vercel puedes ver:
- Logs en tiempo real
- Métricas de performance
- Errores y crashes
- Analytics de tráfico

## 🎉 ¡Listo!

Tu aplicación ahora está en producción en Vercel con:
- ✅ Frontend Angular optimizado
- ✅ API REST funcional
- ✅ Envío de emails con Resend
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Despliegues automáticos

---

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Angular on Vercel](https://vercel.com/guides/deploying-angular-with-vercel)
