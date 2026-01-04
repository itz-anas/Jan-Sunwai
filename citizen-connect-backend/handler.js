'use strict';

const grievanceService = require('./services/grievanceService');
const { successResponse, errorResponse } = require('./utils/response');

exports.handler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    const httpMethod = event.httpMethod || event.requestContext?.http?.method;
    const path = event.path || event.rawPath || '/';
    const pathParameters = event.pathParameters || {};
    
    console.log(`Method: ${httpMethod}, Path: ${path}`);

    // CORS headers
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    // Handle OPTIONS (preflight)
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify({ message: 'OK' })
      };
    }

    let body = null;
    if (event.body) {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }

    // CREATE grievance
    if (httpMethod === 'POST' && (path === '/grievances' || path === '/api/grievances')) {
      console.log('Creating grievance with body:', body);
      const result = await grievanceService.createGrievance(body);
      return {
        statusCode: 201,
        headers: responseHeaders,
        body: JSON.stringify(successResponse(201, result))
      };
    }

    // READ all grievances
    if (httpMethod === 'GET' && (path === '/grievances' || path === '/api/grievances')) {
      console.log('Fetching all grievances');
      const result = await grievanceService.getGrievances();
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(successResponse(200, result))
      };
    }

    // READ single grievance
    if (httpMethod === 'GET' && (path.startsWith('/grievances/') || path.startsWith('/api/grievances/'))) {
      const grievanceId = pathParameters.grievanceId || path.split('/').pop();
      console.log('Fetching grievance:', grievanceId);
      const result = await grievanceService.getGrievanceById(grievanceId);
      
      if (!result) {
        return {
          statusCode: 404,
          headers: responseHeaders,
          body: JSON.stringify(errorResponse(404, 'Grievance not found'))
        };
      }
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(successResponse(200, result))
      };
    }

    // UPDATE grievance
    if (httpMethod === 'PUT' && (path.startsWith('/grievances/') || path.startsWith('/api/grievances/'))) {
      const grievanceId = pathParameters.grievanceId || path.split('/').pop();
      console.log('Updating grievance:', grievanceId, 'with:', body);
      const result = await grievanceService.updateGrievance(grievanceId, body);
      
      if (!result) {
        return {
          statusCode: 404,
          headers: responseHeaders,
          body: JSON.stringify(errorResponse(404, 'Grievance not found'))
        };
      }
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(successResponse(200, result))
      };
    }

    // DELETE grievance
    if (httpMethod === 'DELETE' && (path.startsWith('/grievances/') || path.startsWith('/api/grievances/'))) {
      const grievanceId = pathParameters.grievanceId || path.split('/').pop();
      console.log('Deleting grievance:', grievanceId);
      const result = await grievanceService.deleteGrievance(grievanceId);
      
      if (!result) {
        return {
          statusCode: 404,
          headers: responseHeaders,
          body: JSON.stringify(errorResponse(404, 'Grievance not found'))
        };
      }
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(successResponse(200, { message: 'Grievance deleted successfully' }))
      };
    }

    // Health check
    if (path === '/health' || path === '/api/health') {
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify({ status: 'ok', message: 'Server is running' })
      };
    }

    return {
      statusCode: 404,
      headers: responseHeaders,
      body: JSON.stringify(errorResponse(404, 'Route not found'))
    };

  } catch (err) {
    console.error('ERROR:', err);
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    return {
      statusCode: 500,
      headers: responseHeaders,
      body: JSON.stringify(errorResponse(500, err.message || 'Internal Server Error'))
    };
  }
};
