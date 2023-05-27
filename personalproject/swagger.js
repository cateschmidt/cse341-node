const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Boats',
    description: 'Get an updated boat'
  },
  host: 'cse341-node-7u0k.onrender.com',
  schemes: ['https']
  // host: 'localhost:8080',
  // schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);