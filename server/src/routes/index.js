const express = require('express');
const router = express.Router();

const search = require('./search');
const author = require('./author');
const institution = require('./institution');
const article = require('./article');
const savedSearch = require('./savedSearch');
const savedResult = require('./savedResult');
const storeSearch = require('./storeSearch');
const updateSearch = require('./updateSearch');
const deleteSearch = require('./deleteSearch');
const dbClear = require('./dbClear');

router.get('/search', search);
router.get('/author/:id', author);
router.get('/institution/:id', institution);
router.get('/article/:id', article);
router.get('/saved-search', savedSearch);
router.get('/saved-search/:id', savedResult);
router.post('/saved-search', storeSearch);
router.put('/saved-search/:id', updateSearch);
router.delete('/saved-search/:id', deleteSearch);
router.delete('/saved-search', dbClear);

module.exports = router;
