// api/subscriptions.js - Vercel Serverless Function para endpoints de suscripciones
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

    // GET /api/subscriptions - Obtener todas las suscripciones
    if (req.method === 'GET') {
      return res.status(200).json(dbData.subscriptions || []);
    }

    // POST /api/subscriptions - Crear nueva suscripción
    if (req.method === 'POST') {
      const newSubscription = {
        id: Date.now().toString(),
        ...req.body,
        date: new Date().toISOString()
      };

      dbData.subscriptions = dbData.subscriptions || [];
      dbData.subscriptions.push(newSubscription);

      // Guardar en db.json
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

      return res.status(201).json(newSubscription);
    }

    // DELETE /api/subscriptions/:id - Eliminar suscripción
    if (req.method === 'DELETE') {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const id = url.pathname.split('/').pop();

      if (!dbData.subscriptions) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      const index = dbData.subscriptions.findIndex(s => s.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      dbData.subscriptions.splice(index, 1);
      fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

      return res.status(200).json({ message: 'Subscription deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in subscriptions API:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
