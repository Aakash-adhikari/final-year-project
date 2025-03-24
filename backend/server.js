require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const loadRoutes = require('./routes/loadRoutes');  
app.use('/api/loads', loadRoutes);  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
