'use strict';

const { handler } = require('./handler');

// Simulated API Gateway event
const event = {
  httpMethod: 'DELETE',
  path: '/grievances',
  body: JSON.stringify({
    title: 'Water issue',
    description: 'No water supply'
  })
};


(async () => {
  const response = await handler(event);
  console.log('Lambda response:', response);
})();
