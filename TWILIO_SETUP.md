# Configuración de Twilio para Envío de SMS

## 🚀 Pasos para Configurar Twilio (IMPORTANTE)

### 1. **Crear cuenta en Twilio**
   - Ve a [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
   - Haz clic en "Sign up for free"
   - Completa el formulario de registro
   - **Verifica tu email** (revisa spam si no lo ves)
   - **Verifica tu número de teléfono** (recibirás un código SMS)

### 2. **Obtener Crédito Inicial** 🎁
   - Twilio te da **$15 USD gratis** al crear tu cuenta
   - Este crédito alcanza para enviar ~1,000-1,500 SMS
   - Suficiente para desarrollo y pruebas

### 3. **Obtener Credenciales** ⚠️ PASO CRÍTICO
   
   Una vez en el Dashboard de Twilio:
   
   #### A. Account SID y Auth Token
   - Ve a [https://console.twilio.com](https://console.twilio.com)
   - En el Dashboard principal verás:
     - **Account SID** (empieza con `AC...`)
     - **Auth Token** (haz clic en "Show" para verlo)
   - **Copia ambos valores**
   
   #### B. Número de Teléfono Twilio
   - Ve a **Phone Numbers → Manage → Active numbers**
   - O directo: [https://console.twilio.com/us1/develop/phone-numbers/manage/incoming](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)
   - Si no tienes un número, haz clic en **"Buy a number"**
   - Selecciona un número de USA (son gratis con el crédito de prueba)
   - Asegúrate que tenga capacidad de **SMS**
   - **Copia el número** (formato: +1234567890)

### 4. **Configurar en tu proyecto**
   ```bash
   # Edita el archivo .env en la raíz del proyecto
   
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=tu_auth_token_secreto_aqui
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### 5. **Verificar números de destino (Solo plan gratuito)** 📋
   
   ⚠️ **IMPORTANTE**: Con el plan de prueba, solo puedes enviar SMS a números verificados
   
   Para verificar un número:
   1. Ve a [https://console.twilio.com/us1/develop/phone-numbers/manage/verified](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)
   2. Haz clic en **"Add a new Verified Caller ID"**
   3. Ingresa tu número de celular (formato: +573001234567 para Colombia)
   4. Recibirás un código SMS
   5. Ingresa el código para verificar

### 6. **Reiniciar el servidor**
   ```bash
   # Si el servidor está corriendo, presiona Ctrl+C y luego:
   npm run api
   
   # Deberías ver:
   # ✅ Twilio credentials configuradas
   ```

## 📱 Testing

### Testing en la aplicación

Para probar el envío de SMS:

```bash
# Terminal 1: Inicia el servidor de API
npm run api

# Terminal 2: Inicia la aplicación Angular
npm start

# En la aplicación:
# 1. Ve a la página de fondos
# 2. Suscríbete a un fondo
# 3. Selecciona "SMS" como método de notificación
# 4. Ingresa un número VERIFICADO (10 dígitos sin +57)
# 5. El SMS se enviará automáticamente
```

### Testing manual del endpoint

Puedes probar el endpoint directamente con curl:

```bash
curl -X POST http://localhost:3000/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "3001234567",
    "fundName": "Fondo de Prueba",
    "amount": 50000,
    "subscriptionDate": "2024-03-17T10:00:00.000Z"
  }'
```

**Nota**: El número debe estar verificado en Twilio si usas el plan gratuito.

## 💰 Costos y Límites

### Plan Gratuito (Trial)
- ✅ $15 USD de crédito inicial (no renovable)
- ✅ ~1,000-1,500 SMS dependiendo del destino
- ⚠️ Solo puedes enviar SMS a números verificados
- ⚠️ Los SMS incluyen un prefijo "Sent from your Twilio trial account"

### Costos aproximados por SMS
- **Colombia**: ~$0.01 USD por SMS
- **USA**: ~$0.0075 USD por SMS
- **México**: ~$0.01 USD por SMS

### Actualizar a Plan de Pago
1. Ve a [https://console.twilio.com/us1/billing/manage-billing/billing-overview](https://console.twilio.com/us1/billing/manage-billing/billing-overview)
2. Agrega una tarjeta de crédito
3. Compra crédito adicional ($20 USD mínimo)
4. **Beneficios**:
   - Envía SMS a cualquier número (sin verificación)
   - Sin prefijo "trial" en los mensajes
   - Acceso a números de Colombia (+57)

## 🐛 Troubleshooting

### ❌ "Twilio credentials no configuradas"

**Causa**: Las variables de entorno no están configuradas o tienen valores de ejemplo.

**Solución**:
1. Verifica que tu archivo `.env` tenga las 3 variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
2. Los valores NO deben ser:
   - `TU_ACCOUNT_SID_AQUI`
   - `TU_AUTH_TOKEN_AQUI`
   - `TU_NUMERO_TWILIO_AQUI`
3. Copia las credenciales reales del Dashboard de Twilio
4. Reinicia el servidor

### ⚠️ "The number +573001234567 is unverified"

**Causa**: Estás usando el plan gratuito y el número destino no está verificado.

**Solución**:
1. Ve a [Verified Caller IDs](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)
2. Agrega y verifica el número que quieres usar
3. O actualiza a un plan de pago

### 🚫 "Authenticate"

**Causa**: El Account SID o Auth Token son incorrectos.

**Solución**:
1. Ve al [Dashboard de Twilio](https://console.twilio.com)
2. Verifica que copiaste correctamente:
   - Account SID (debe empezar con `AC`)
   - Auth Token (haz clic en "Show" primero)
3. Actualiza el `.env` con los valores correctos
4. Asegúrate de no incluir espacios extra

### 💸 "Insufficient balance"

**Causa**: Se acabó tu crédito de $15 USD.

**Solución**:
- Agrega crédito a tu cuenta en [Billing](https://console.twilio.com/us1/billing/manage-billing/billing-overview)
- Mínimo $20 USD

### 📱 "Invalid 'To' Phone Number"

**Causa**: El formato del número es incorrecto.

**Solución**:
- El número debe ser de 10 dígitos: `3001234567`
- El código del país (+57) se agrega automáticamente en el backend
- NO incluyas: espacios, guiones, paréntesis

## 🔧 Para Producción en Vercel

### Configurar Variables de Entorno

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Agrega las 3 variables:

| Name | Value | Environments |
|------|-------|--------------|
| `TWILIO_ACCOUNT_SID` | Tu Account SID | Production, Preview, Development |
| `TWILIO_AUTH_TOKEN` | Tu Auth Token | Production, Preview, Development |
| `TWILIO_PHONE_NUMBER` | Tu número Twilio | Production, Preview, Development |

4. **Re-despliega** el proyecto para aplicar los cambios

### Recomendación para Producción

Si vas a usar SMS en producción:
1. **Actualiza a plan de pago** para:
   - Enviar a cualquier número sin verificación
   - Eliminar el prefijo "trial"
   - Obtener un número local de Colombia (+57) si tu audiencia es colombiana
2. **Monitorea tu consumo** en el Dashboard de Twilio
3. **Configura alertas** de crédito bajo

## 📊 Monitoreo

En el Dashboard de Twilio puedes ver:
- **Mensajes enviados**: [https://console.twilio.com/us1/monitor/logs/sms](https://console.twilio.com/us1/monitor/logs/sms)
- **Crédito disponible**: En el banner superior
- **Costos por SMS**: En cada log de mensaje
- **Errores y entregas fallidas**

## 🎯 URLs Útiles

- **Dashboard**: [https://console.twilio.com](https://console.twilio.com)
- **Obtener credenciales**: [https://console.twilio.com](https://console.twilio.com)
- **Números de teléfono**: [https://console.twilio.com/us1/develop/phone-numbers/manage/incoming](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)
- **IDs verificados**: [https://console.twilio.com/us1/develop/phone-numbers/manage/verified](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)
- **Logs de SMS**: [https://console.twilio.com/us1/monitor/logs/sms](https://console.twilio.com/us1/monitor/logs/sms)
- **Billing**: [https://console.twilio.com/us1/billing/manage-billing/billing-overview](https://console.twilio.com/us1/billing/manage-billing/billing-overview)
- **Documentación**: [https://www.twilio.com/docs/sms](https://www.twilio.com/docs/sms)

---

## 🎉 ¡Listo!

Ahora tu aplicación puede enviar SMS de confirmación a través de Twilio con:
- ✅ $15 USD gratis para pruebas
- ✅ API simple y confiable
- ✅ Compatible con Vercel
- ✅ Logs y monitoreo en tiempo real
- ✅ Integración perfecta con tu flujo de suscripciones
