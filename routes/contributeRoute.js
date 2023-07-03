const express = require('express');
const createDoc = require('../controllers/contrubuteController')

const router = express.Router();

router.post('/contribute', createDoc);

module.exports = router;