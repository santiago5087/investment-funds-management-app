// api/transactions.js - Vercel Serverless Function para endpoints de transacciones
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // GET /api/transactions - Obtener todas las transacciones
    if (req.method === 'GET') {
      return res.status(200).json(dbData.transactions || []);
    }

    // POST /api/transactions - Crear nueva transacción
    if (req.method === 'POST') {
      const newTransaction = {
        id: Date.now().toString(),
        ...req.body,
        date: new Date().toISOString()
      };

      dbData.transactions = dbData.transactions || [];
      dbData.transactions.push(newTransaction);

      // Guardar en db.json
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

      return res.status(201).json(newTransaction);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in transactions API:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
