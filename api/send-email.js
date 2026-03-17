// api/send-email.js - Vercel Serverless Function para envío de emails con Resend
const { Resend } = require('resend');

// Validar que la API key esté configurada
const resend = new Resend(process.env.RESEND_API_KEY);

// Template de email HTML
function getSubscriptionEmailTemplate(data) {
  const { fundName, amount, subscriptionDate, notificationMethod } = data;
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Suscripción - BTG Fondos</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">BTG Fondos</h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Confirmación de Suscripción</p>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: #4caf50; border-radius: 50%; line-height: 80px; text-align: center;">
                <span style="color: white; font-size: 48px; font-weight: bold; vertical-align: middle;">✓</span>
              </div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #333; font-size: 24px; font-weight: 600; text-align: center;">¡Suscripción Exitosa!</h2>
              
              <p style="margin: 0 0 30px; color: #666; font-size: 16px; line-height: 1.6; text-align: center;">
                Tu suscripción al fondo de inversión ha sido procesada correctamente.
              </p>
              
              <!-- Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-size: 14px;">Fondo:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${fundName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">Monto invertido:</td>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #1976d2; font-size: 18px; font-weight: 600; text-align: right;">$${amount.toLocaleString('es-CO')}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">Fecha:</td>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${new Date(subscriptionDate).toLocaleDateString('es-CO', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">Notificación:</td>
                        <td style="padding: 8px 0; border-top: 1px solid #e0e0e0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${notificationMethod === 'email' ? 'Email' : 'SMS'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                Puedes revisar el estado de tus inversiones en cualquier momento desde tu panel de control.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="margin: 0 0 10px; color: #999; font-size: 12px;">
                Este es un correo automático, por favor no respondas a este mensaje.
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © ${new Date().getFullYear()} BTG Fondos. Todos los derechos reservados.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

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
    const { email, fundName, amount, subscriptionDate, notificationMethod } = req.body;

    // Validaciones
    if (!email || !fundName || !amount || !subscriptionDate || !notificationMethod) {
      return res.status(400).json({ 
        error: 'Faltan datos requeridos',
        required: ['email', 'fundName', 'amount', 'subscriptionDate', 'notificationMethod']
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Verificar que RESEND_API_KEY esté configurada
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'TU_API_KEY_REAL_AQUI') {
      console.error('⚠️  RESEND_API_KEY no está configurada correctamente');
      console.error('   Obtén tu API key en: https://resend.com/api-keys');
      return res.status(500).json({ 
        error: 'Servicio de email no configurado',
        message: 'La API key de Resend no está configurada. Por favor obtén una API key real en https://resend.com/api-keys y configúrala en el archivo .env'
      });
    }

    // Generar HTML del email
    const htmlContent = getSubscriptionEmailTemplate({
      fundName,
      amount,
      subscriptionDate,
      notificationMethod
    });

    // Enviar email con Resend
    const data = await resend.emails.send({
      from: 'BTG Fondos <onboarding@resend.dev>', // Usar tu dominio verificado en producción
      to: [email],
      subject: `Confirmación de Suscripción - ${fundName}`,
      html: htmlContent,
    });

    console.log('✅ Email enviado exitosamente');
    console.log('   Email ID:', data.id);
    console.log('   Destinatario:', email);
    console.log('   Fondo:', fundName);
    console.log('   NOTA: Si no recibes el email, revisa tu carpeta de spam');

    return res.status(200).json({ 
      success: true,
      message: 'Email de confirmación enviado exitosamente',
      emailId: data.id,
      recipient: email
    });

  } catch (error) {
    console.error('❌ Error al enviar email:', error.message);
    
    let errorMessage = error.message;
    let statusCode = 500;
    
    // Detectar errores comunes de Resend
    if (error.message.includes('API key')) {
      errorMessage = 'API key de Resend inválida. Por favor verifica tu configuración en .env';
      console.error('   Solución: Obtén una API key válida en https://resend.com/api-keys');
      statusCode = 401;
    } else if (error.message.includes('rate limit')) {
      errorMessage = 'Límite de envío excedido. El plan gratuito permite 100 emails/día';
      statusCode = 429;
    } else if (error.message.includes('domain')) {
      errorMessage = 'Dominio de email no verificado. Verifica tu dominio en Resend o usa onboarding@resend.dev';
      statusCode = 403;
    }
    
    return res.status(statusCode).json({ 
      error: 'Error al enviar el email',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
