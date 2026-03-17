#!/usr/bin/env node

// server.js - Launcher para el servidor de desarrollo
require('dotenv').config();
const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 JSON Server with email support running at http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/send-email`);
  console.log(`📊 API endpoints: http://localhost:${PORT}/funds, /subscriptions, /transactions`);
  console.log('');
  
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
});
