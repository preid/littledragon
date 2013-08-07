var models = require( '../models/models' );

exports.authenticate = function ( username, password, callback )
{
    models.users.findOne( {username: username}, function ( err, user )
    {
        if ( !user )
        {
            callback( new Error( 'Invalid username' ) );
        }
        else if ( password != user.password )
        {
            callback( new Error( 'Invalid password' ) );
        }
        else
        {
            callback( null, user );
        }
    } );
};

exports.restrict = function restrict( req, res, next )
{
    if ( req.session.user )
    {
        next();
    }
    else
    {
        res.send( 401 );
    }
};