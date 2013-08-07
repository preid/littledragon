var auth = require('../security/authentication');

exports.index = function(req, res){
  res.render('login', { title: 'Please Login' });
};

exports.login = function(req, res){
  auth.authenticate(req.body.username, req.body.password, function(err, user){
      if( user )
      {
        req.session.regenerate(function(){
            req.session.user = user;
            user.password = null;
            res.send( user );
        });
      }
      else
      {
          res.send( 401 );
      }
  });
};

