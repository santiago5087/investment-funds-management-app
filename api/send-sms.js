// api/send-sms.js - Vercel Serverless Function para envío de SMS con Twilio
const twilio = require('twilio');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, fundName, amount, subscriptionDate } = req.body;

    // Validaciones
    if (!phone || !fundName || !amount || !subscriptionDate) {
      return res.status(400).json({ 
        error: 'Faltan datos requeridos',
        required: ['phone', 'fundName', 'amount', 'subscriptionDate']
      });
    }

    // Validar formato de teléfono (10 dígitos)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        error: 'Número de teléfono inválido',
        message: 'El número debe tener 10 dígitos sin espacios ni caracteres especiales'
      });
    }

    // Verificar que las credenciales de Twilio estén configuradas
    if (!process.env.TWILIO_ACCOUNT_SID || 
        !process.env.TWILIO_AUTH_TOKEN || 
        !process.env.TWILIO_PHONE_NUMBER) {
      console.error('⚠️  Credenciales de Twilio no configuradas');
      console.error('   Necesitas: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER');
      return res.status(500).json({ 
        error: 'Servicio de SMS no configurado',
        message: 'Las credenciales de Twilio no están configuradas. Por favor configura las variables de entorno en Vercel.'
      });
    }

    // Validar que no sean valores de ejemplo
    if (process.env.TWILIO_ACCOUNT_SID === 'TU_ACCOUNT_SID_AQUI' ||
        process.env.TWILIO_AUTH_TOKEN === 'TU_AUTH_TOKEN_AQUI' ||
        process.env.TWILIO_PHONE_NUMBER === 'TU_NUMERO_TWILIO_AQUI') {
      console.error('⚠️  Credenciales de Twilio no son válidas (valores de ejemplo)');
      return res.status(500).json({ 
        error: 'Servicio de SMS no configurado',
        message: 'Las credenciales de Twilio son valores de ejemplo. Por favor obtén credenciales reales en twilio.com'
      });
    }

    // Crear cliente de Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Formatear el número de teléfono con código de país Colombia (+57)
    const formattedPhone = `+57${phone}`;

    // Formatear la fecha
    const date = new Date(subscriptionDate).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Mensaje de confirmación
    const messageBody = `¡Suscripción exitosa! BTG Fondos\n\n` +
      `Fondo: ${fundName}\n` +
      `Monto: $${amount.toLocaleString('es-CO')}\n` +
      `Fecha: ${date}\n\n` +
      `Gracias por confiar en nosotros.`;

    // Enviar SMS con Twilio
    const message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log('✅ SMS enviado exitosamente');
    console.log('   Message SID:', message.sid);
    console.log('   Destinatario:', formattedPhone);
    console.log('   Fondo:', fundName);
    console.log('   Estado:', message.status);

    return res.status(200).json({ 
      success: true,
      message: 'SMS de confirmación enviado exitosamente',
      messageSid: message.sid,
      recipient: formattedPhone,
      status: message.status
    });

  } catch (error) {
    console.error('❌ Error al enviar SMS:', error.message);
    
    let errorMessage = error.message;
    let statusCode = 500;
    
    // Detectar errores comunes de Twilio
    if (error.code === 21211) {
      errorMessage = 'Número de teléfono inválido';
      statusCode = 400;
    } else if (error.code === 21608) {
      errorMessage = 'El número de teléfono no puede recibir SMS';
      statusCode = 400;
    } else if (error.code === 21610) {
      errorMessage = 'El número de teléfono está en la lista de bloqueo';
      statusCode = 403;
    } else if (error.code === 20003) {
      errorMessage = 'Credenciales de Twilio inválidas. Verifica tu Account SID y Auth Token';
      console.error('   Solución: Verifica tus credenciales en https://console.twilio.com');
      statusCode = 401;
    } else if (error.code === 21606) {
      errorMessage = 'El número de origen (Twilio) no es válido o no está verificado';
      console.error('   Solución: Verifica tu número de Twilio en https://console.twilio.com/us1/develop/phone-numbers/manage/incoming');
      statusCode = 400;
    } else if (error.message.includes('balance')) {
      errorMessage = 'Saldo insuficiente en la cuenta de Twilio. Necesitas agregar crédito.';
      statusCode = 402;
    }
    
    return res.status(statusCode).json({ 
      error: 'Error al enviar el SMS',
      message: errorMessage,
      code: error.code,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
