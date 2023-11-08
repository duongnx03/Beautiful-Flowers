var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index Page' });
});

router.get('/admin/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin Page', layout: 'admin/adminLayout' });
});

module.exports = router;
