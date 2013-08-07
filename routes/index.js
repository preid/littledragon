exports.index = function(req, res){
  res.render('index', { title: 'Little Dragon' });
};

exports.welcome = function(req, res){
  res.send("Welcome!!");
};