// api/funds.js - Vercel Serverless Function para endpoints de fondos
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

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.replace('/api/funds', '');

    // GET /api/funds - Obtener todos los fondos
    if (req.method === 'GET' && !pathname) {
      return res.status(200).json(dbData.funds || []);
    }

    // GET /api/funds/:id - Obtener un fondo específico
    if (req.method === 'GET' && pathname) {
      const id = pathname.replace('/', '');
      const fund = dbData.funds?.find(f => f.id === id);
      
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }
      
      return res.status(200).json(fund);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in funds API:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
