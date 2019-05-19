var express = require('express');
var router = express.Router();

var table_controller = require('../controllers/tableController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'pow'});
});


module.exports = router;
