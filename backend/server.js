require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const path =require('path');

const app = express();
const port = process.env.PORT || 5001;



app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const loadRoutes = require('./routes/loadRoutes');  
app.use('/api/loads', loadRoutes); 

const paymentRoutes = require('./routes/paymentRoutes')
app.use('/api/payment', paymentRoutes)

const notification = require('./routes/notifications')
app.use('/api/notify',notification)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
