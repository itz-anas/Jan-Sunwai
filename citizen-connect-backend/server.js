const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const grievanceService = require('./services/grievanceService');
const { successResponse, errorResponse } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ===== GRIEVANCE ROUTES =====

// CREATE grievance
app.post('/api/grievances', async (req, res) => {
  try {
    const { citizenName, citizenEmail, citizenPhone, category, description, title, location, priority } = req.body;

    // Validation
    if (!citizenName || !citizenPhone || !category || !description) {
      return res.status(400).json(errorResponse(400, 'Missing required fields'));
    }

    const result = await grievanceService.createGrievance({
      citizenName,
      citizenEmail: citizenEmail || '',
      citizenPhone,
      category,
      description,
      title: title || description.substring(0, 50),
      location: location || '',
      priority: priority || 'Medium',
    });

    return res.status(201).json(successResponse(201, result));
  } catch (err) {
    console.error('Error creating grievance:', err);
    return res.status(500).json(errorResponse(500, err.message || 'Internal Server Error'));
  }
});

// READ all grievances
app.get('/api/grievances', async (req, res) => {
  try {
    const result = await grievanceService.getGrievances();
    return res.status(200).json(successResponse(200, result));
  } catch (err) {
    console.error('Error fetching grievances:', err);
    return res.status(500).json(errorResponse(500, err.message || 'Internal Server Error'));
  }
});

// READ single grievance by ID
app.get('/api/grievances/:grievanceId', async (req, res) => {
  try {
    const { grievanceId } = req.params;

    if (!grievanceId) {
      return res.status(400).json(errorResponse(400, 'Grievance ID is required'));
    }

    const result = await grievanceService.getGrievanceById(grievanceId);
    
    if (!result) {
      return res.status(404).json(errorResponse(404, 'Grievance not found'));
    }

    return res.status(200).json(successResponse(200, result));
  } catch (err) {
    console.error('Error fetching grievance:', err);
    return res.status(500).json(errorResponse(500, err.message || 'Internal Server Error'));
  }
});

// UPDATE grievance
app.put('/api/grievances/:grievanceId', async (req, res) => {
  try {
    const { grievanceId } = req.params;
    const { status, adminRemarks } = req.body;

    if (!grievanceId) {
      return res.status(400).json(errorResponse(400, 'Grievance ID is required'));
    }

    if (!status) {
      return res.status(400).json(errorResponse(400, 'Status is required'));
    }

    const result = await grievanceService.updateGrievance(grievanceId, {
      status,
      adminRemarks: adminRemarks || '',
    });

    if (!result) {
      return res.status(404).json(errorResponse(404, 'Grievance not found'));
    }

    return res.status(200).json(successResponse(200, result));
  } catch (err) {
    console.error('Error updating grievance:', err);
    return res.status(500).json(errorResponse(500, err.message || 'Internal Server Error'));
  }
});

// DELETE grievance
app.delete('/api/grievances/:grievanceId', async (req, res) => {
  try {
    const { grievanceId } = req.params;

    if (!grievanceId) {
      return res.status(400).json(errorResponse(400, 'Grievance ID is required'));
    }

    const result = await grievanceService.deleteGrievance(grievanceId);

    if (!result) {
      return res.status(404).json(errorResponse(404, 'Grievance not found'));
    }

    return res.status(200).json(successResponse(200, { message: 'Grievance deleted successfully' }));
  } catch (err) {
    console.error('Error deleting grievance:', err);
    return res.status(500).json(errorResponse(500, err.message || 'Internal Server Error'));
  }
});

// 404 handler
app.use((req, res) => {
  return res.status(404).json(errorResponse(404, 'Route not found'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  return res.status(500).json(errorResponse(500, 'Internal Server Error'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
