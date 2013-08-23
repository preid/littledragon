var models = require( '../models/sql_models' );
var bcrypt = require('bcrypt');

exports.authenticate = function ( username, password, callback )
{
    models.User.find( {where: {username: username}} ).success( function ( user )
    {
        if ( !user )
        {
            callback( new Error( 'Invalid username' ) );
        }
        else if ( !bcrypt.compareSync( password, user.password ) )
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