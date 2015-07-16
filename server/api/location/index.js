'use strict';

var express = require('express');
var controller = require('./location.controller');

var router = express.Router();

router.get('/:city/:userID?', controller.show);
router.post('/:locationID/:userID', controller.create);
router.delete('/:locationID/:userID', controller.destroy);

module.exports = router;
