import express from 'express';
import { config } from './config.js';
import { pool } from './db.js';
// routes
import { authRouter } from './modules/auth/auth.routes.js';

const app = express();
app.use(express.json());
app.use('/auth', authRouter)

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch (err) {
    res.status(503).json({ status: 'error', db: 'down', message: (err as Error).message });
  }
});

app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});
