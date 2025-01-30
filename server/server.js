import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Needed to have ESM recognize __dirname
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// Authentication
app.use('/api/auth', authRoutes);

// Landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});