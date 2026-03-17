# Configuración de Resend para Envío de Emails

# Configuración de Resend para Envío de Emails

## 🚀 Pasos para Configurar Resend (IMPORTANTE)

### 1. **Crear cuenta en Resend**
   - Ve a [https://resend.com](https://resend.com)
   - Haz clic en "Sign Up"
   - Crea una cuenta gratuita (100 emails/día)
   - **Verifica tu email** (revisa spam si no lo ves)

### 2. **Obtener API Key** ⚠️ PASO CRÍTICO
   - Inicia sesión en Resend
   - Ve a [https://resend.com/api-keys](https://resend.com/api-keys)
   - Haz clic en **"Create API Key"**
   - Dale un nombre (ej: "BTG Fondos Development")
   - **COPIA LA KEY INMEDIATAMENTE** (solo se muestra una vez)
   - La key empieza con `re_` seguido de caracteres aleatorios

### 3. **Configurar en tu proyecto**
   ```bash
   # Edita el archivo .env en la raíz del proyecto
   # Reemplaza TU_API_KEY_REAL_AQUI con la key que copiaste
   
   RESEND_API_KEY=re_tu_key_aqui_copiada_de_resend
   ```

### 4. **Reiniciar el servidor**
   ```bash
   # Si el servidor está corriendo, presiona Ctrl+C y luego:
   npm run api
   
   # Deberías ver:
   # ✅ Resend API key configurada
   ```
   - Por defecto usa `onboarding@resend.dev`
   - Para usar tu dominio:
     - Ve a [https://resend.com/domains](https://resend.com/domains)
     - Agrega tu dominio
     - Configura los registros DNS
     - Actualiza el `from` en `api/send-email.js`

## Testing

Para probar el envío de emails localmente:

```bash
# Terminal 1: Inicia el servidor de API con soporte para emails
npm run api

# Terminal 2: Inicia la aplicación Angular
npm start

# El email se enviará automáticamente cuando:
# 1. Un usuario se suscriba a un fondo
# 2. Seleccione "Email" como método de notificación
# 3. Ingrese un email válido
```

### Testing manual del endpoint

Puedes probar el endpoint directamente con curl:

```bash
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu-email@ejemplo.com",
    "fundName": "Fondo de Prueba",
    "amount": 50000,
    "subscriptionDate": "2024-03-17T10:00:00.000Z",
    "notificationMethod": "email"
  }'
```

## Troubleshooting

### ❌ "Dice que se envió pero no me llega el email"

**Causa más común:** La API key no es válida o es de ejemplo.

**Solución:**
1. Verifica que tu API key en `.env` NO sea `TU_API_KEY_REAL_AQUI`
2. La API key debe empezar con `re_` y tener caracteres aleatorios
3. Si copiaste la key de `.env.example`, NO funcionará - necesitas obtener tu propia key
4. Ve a [https://resend.com/api-keys](https://resend.com/api-keys) y obtén una key real
5. Reinicia el servidor después de actualizar `.env`

### ⚠️ "API key inválida"

**Solución:**
- Ve a [https://resend.com/api-keys](https://resend.com/api-keys)
- Verifica que la key esté activa (no eliminada)
- Crea una nueva key si es necesario
- Copia y pega cuidadosamente (sin espacios extra)

### 📧 "El email llega a spam"

**Solución:**
- Esto es normal con `onboarding@resend.dev` (dominio de prueba)
- Revisa tu carpeta de spam/correo no deseado  
- Marca el email como "No es spam"
- Para producción, verifica tu propio dominio en Resend

### 🚫 "Rate limit exceeded"

**Solución:**
- El plan gratuito tiene límite de 100 emails/día
- Espera 24 horas para que se resetee
- O actualiza a un plan de pago en Resend

### 🔍 Verificar que todo funciona

Si los emails no llegan, verifica en la consola del servidor:
- ✅ Debe decir "Resend API key configurada"  
- ❌ Si dice "API KEY NO CONFIGURADA", sigue los pasos arriba

También revisa los logs cuando envíes un email:
```
✅ Email enviado exitosamente
   Email ID: abc123...
   Destinatario: tu-email@ejemplo.com
```

Si ves esto, el email SÍ fue enviado correctamente por Resend.

---

## Límites del Plan Gratuito

- 100 emails por día
- 1 dominio verificado
- Soporte por email
- Perfecto para desarrollo y MVP

## Troubleshooting

Si los emails no se envían, verifica:
1. La API key está configurada correctamente
2. El formato del email es válido
3. Revisa los logs en Vercel o en la consola del navegador
4. Verifica que no hayas excedido el límite diario
