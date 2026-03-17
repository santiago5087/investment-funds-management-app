#!/usr/bin/env node

// server.js - Launcher para el servidor de desarrollo
require('dotenv').config();
const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 JSON Server with email support running at http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/send-email`);
  console.log(`� SMS endpoint: http://localhost:${PORT}/send-sms`);
  console.log(`📊 API endpoints: http://localhost:${PORT}/funds, /subscriptions, /transactions`);
  console.log('');
  
  // Verificar Resend API Key
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'TU_API_KEY_REAL_AQUI') {
    console.log(`✅ Resend API key configurada`);
  } else {
    console.log(`⚠️  RESEND API KEY NO CONFIGURADA`);
    console.log(`   Los emails NO se enviarán hasta que configures una API key válida`);
    console.log(`   `);
    console.log(`   Pasos para configurar:`);
    console.log(`   1. Ve a https://resend.com y crea una cuenta`);
    console.log(`   2. Obtén tu API key en https://resend.com/api-keys`);
    console.log(`   3. Edita el archivo .env y reemplaza TU_API_KEY_REAL_AQUI con tu key`);
    console.log(`   4. Reinicia el servidor con: npm run api`);
  }
  console.log('');
  
  // Verificar Twilio Credentials
  if (process.env.TWILIO_ACCOUNT_SID && 
      process.env.TWILIO_AUTH_TOKEN && 
      process.env.TWILIO_PHONE_NUMBER &&
      process.env.TWILIO_ACCOUNT_SID !== 'TU_ACCOUNT_SID_AQUI') {
    console.log(`✅ Twilio credentials configuradas`);
  } else {
    console.log(`⚠️  TWILIO CREDENTIALS NO CONFIGURADAS`);
    console.log(`   Los SMS NO se enviarán hasta que configures credenciales válidas`);
    console.log(`   `);
    console.log(`   Pasos para configurar:`);
    console.log(`   1. Ve a https://www.twilio.com/try-twilio y crea una cuenta`);
    console.log(`   2. Obtén $15 USD de crédito gratis`);
    console.log(`   3. Copia Account SID, Auth Token y Phone Number del Dashboard`);
    console.log(`   4. Edita el archivo .env con tus credenciales`);
    console.log(`   5. Reinicia el servidor con: npm run api`);
  }
  console.log('');
});
