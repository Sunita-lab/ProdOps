const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('ProdOps API is running...');
});


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const productionOrderRoutes = require('./routes/productionOrderRoutes');
app.use('/api/orders', productionOrderRoutes);

const downtimeRoutes = require('./routes/downtimeRoutes');
app.use('/api/downtimes', downtimeRoutes);

const qualityInspectionRoutes = require('./routes/qualityInspectionRoutes');
app.use('/api/quality', qualityInspectionRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});