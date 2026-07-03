import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRouter from './student_api/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sbjitmr_admission';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('📁 Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Resolve paths in ES modules environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON request bodies
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API endpoint mapping
app.use('/api/students', studentRouter);

// Serve frontend build static files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback index.html router for SPA routing support in production
app.get('/*splat', (req, res) => {
  // Do not serve index.html for undefined API requests
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // Friendly message if Vite dist bundle is not built yet
      res.status(200).send(`
        <html>
          <head>
            <title>SBJITMR Admission Portal Backend</title>
            <style>
              body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #0f172a; }
              div { text-align: center; max-width: 600px; padding: 2rem; border-radius: 8px; background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
              h1 { color: #0d47a1; margin-top: 0; }
              p { color: #475569; line-height: 1.5; }
              code { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            </style>
          </head>
          <body>
            <div>
              <h1>🏫 SBJITMR Admission Portal Backend</h1>
              <p>The backend Express server is running successfully on port <strong>${PORT}</strong>.</p>
              <p>To run the frontend client, run <code>npm run dev</code> in another terminal window and visit the Vite client URL (usually http://localhost:5173).</p>
            </div>
          </body>
        </html>
      `);
    }
  });
});

// Start listening for incoming connections
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Express server is running on http://localhost:${PORT}`);
  console.log(`📂 Serving static files from: ${distPath}`);
  console.log(`==================================================\n`);
});
