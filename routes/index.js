exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.welcome = function(req, res){
  res.send("Welcome!!");
};