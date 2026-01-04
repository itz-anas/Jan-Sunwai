'use strict';

// Load env vars (local only)
require('dotenv').config();

// AWS SDK (optional - can be used later for production)
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS region
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
});

// Create DynamoDB Document Client (optional for production)
const dynamoDB = process.env.USE_DYNAMODB === 'true' ? new AWS.DynamoDB.DocumentClient() : null;

// Table name (for production DynamoDB)
const TABLE_NAME = process.env.TABLE_NAME || 'grievances';

// ===== IN-MEMORY STORAGE FOR DEVELOPMENT =====
let grievancesDB = {};

// ===== SERVICE FUNCTIONS =====

// CREATE grievance
const createGrievance = async (data) => {
  const grievanceId = `grv_${uuidv4()}`;
  const timestamp = new Date().toISOString();

  const grievanceRecord = {
    grievanceId,
    citizenName: data.citizenName,
    citizenEmail: data.citizenEmail || '',
    citizenPhone: data.citizenPhone || '',
    category: data.category,
    title: data.title || '',
    description: data.description,
    location: data.location || '',
    priority: data.priority || 'Medium',
    status: 'PENDING',
    createdAt: timestamp,
    updatedAt: timestamp,
    adminRemarks: ''
  };

  // Use DynamoDB if available, otherwise use in-memory storage
  if (dynamoDB && process.env.USE_DYNAMODB === 'true') {
    const params = {
      TableName: TABLE_NAME,
      Item: grievanceRecord
    };

    try {
      await dynamoDB.put(params).promise();
    } catch (err) {
      console.error('DynamoDB error, falling back to in-memory storage:', err);
      grievancesDB[grievanceId] = grievanceRecord;
    }
  } else {
    grievancesDB[grievanceId] = grievanceRecord;
  }

  return {
    message: 'Grievance created successfully',
    grievanceId,
    ...grievanceRecord
  };
};

// READ all grievances
const getGrievances = async () => {
  try {
    if (dynamoDB && process.env.USE_DYNAMODB === 'true') {
      const params = {
        TableName: TABLE_NAME
      };

      const result = await dynamoDB.scan(params).promise();
      return result.Items || [];
    } else {
      return Object.values(grievancesDB);
    }
  } catch (err) {
    console.error('Error fetching grievances:', err);
    return Object.values(grievancesDB);
  }
};

// READ single grievance by ID
const getGrievanceById = async (grievanceId) => {
  try {
    if (dynamoDB && process.env.USE_DYNAMODB === 'true') {
      const params = {
        TableName: TABLE_NAME,
        Key: { grievanceId }
      };

      const result = await dynamoDB.get(params).promise();
      return result.Item || null;
    } else {
      return grievancesDB[grievanceId] || null;
    }
  } catch (err) {
    console.error('Error fetching grievance:', err);
    return grievancesDB[grievanceId] || null;
  }
};

// UPDATE grievance
const updateGrievance = async (grievanceId, updateData) => {
  try {
    const existing = await getGrievanceById(grievanceId);

    if (!existing) {
      return null;
    }

    const updatedRecord = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    if (dynamoDB && process.env.USE_DYNAMODB === 'true') {
      const params = {
        TableName: TABLE_NAME,
        Key: { grievanceId },
        UpdateExpression: 'SET #status = :status, #adminRemarks = :adminRemarks, #updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#status': 'status',
          '#adminRemarks': 'adminRemarks',
          '#updatedAt': 'updatedAt'
        },
        ExpressionAttributeValues: {
          ':status': updateData.status || existing.status,
          ':adminRemarks': updateData.adminRemarks || existing.adminRemarks,
          ':updatedAt': new Date().toISOString()
        },
        ReturnValues: 'ALL_NEW'
      };

      try {
        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
      } catch (err) {
        console.error('DynamoDB error, falling back to in-memory storage:', err);
        grievancesDB[grievanceId] = updatedRecord;
        return updatedRecord;
      }
    } else {
      grievancesDB[grievanceId] = updatedRecord;
      return updatedRecord;
    }
  } catch (err) {
    console.error('Error updating grievance:', err);
    return null;
  }
};

// DELETE grievance
const deleteGrievance = async (grievanceId) => {
  try {
    const existing = await getGrievanceById(grievanceId);

    if (!existing) {
      return null;
    }

    if (dynamoDB && process.env.USE_DYNAMODB === 'true') {
      const params = {
        TableName: TABLE_NAME,
        Key: { grievanceId }
      };

      try {
        await dynamoDB.delete(params).promise();
      } catch (err) {
        console.error('DynamoDB error, falling back to in-memory storage:', err);
        delete grievancesDB[grievanceId];
      }
    } else {
      delete grievancesDB[grievanceId];
    }

    return { message: 'Grievance deleted successfully' };
  } catch (err) {
    console.error('Error deleting grievance:', err);
    return null;
  }
};

module.exports = {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance
};
