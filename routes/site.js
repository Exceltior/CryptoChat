var title = require('../app.js').SITENAME;

exports.index = function(req, res){
  res.render('index', { title: title + ' - Secure chat' });
};