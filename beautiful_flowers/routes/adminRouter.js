var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin/index_admin', { title: 'Admin Page' });
});

module.exports = router;
