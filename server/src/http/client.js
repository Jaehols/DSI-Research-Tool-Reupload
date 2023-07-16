const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.elsevier.com/content',
  headers: {
    'X-ELS-APIKey': `${process.env.SCOPUS_API_KEY}`,
    'X-ELS-Insttoken': `${process.env.SCOPUS_INST_TOKEN}`,
    Accept: 'application/json',
  },
});

module.exports = client;
