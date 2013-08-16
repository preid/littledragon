var express = require( 'express' )
    , routes = require( './routes' )
    , http = require( 'http' )
    , path = require( 'path' )
    , models = require( './models/models' )
    , auth = require( './security/authentication.js' )
    , login = require( './routes/login' )
    , fs = require( 'fs' )
    , Sequelize = require("sequelize");

var app = express();
var sequelize = new Sequelize('littledragon', 'littledragon_app', 'letmein', {port: 5432, dialect: 'postgres', omitNull: true});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  name: Sequelize.STRING
});

//sequelize.sync();

User.create({username: "peter", name:"Peter Reid"} ).success( function( user ) { console.log( user ) });
// all environments
app.set( 'port', process.env.PORT || 3001 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.use( express.favicon() );
app.use( express.logger( 'dev' ) );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.cookieParser( 'your secret here' ) );
app.use( express.session() );
app.use( app.router );
app.use( require( 'stylus' ).middleware( __dirname + '/public' ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// development only
if ( 'development' == app.get( 'env' ) )
{
    app.use( express.errorHandler() );
}

var render = function ( req, res )
{
    return function ( err, data )
    {
        if ( null != err )
        {
            res.status( 500 ).send( err.message )
        }
        else
        {
            res.json( data );
        }
    };
};

require( './routes/rest' )( app, auth, models, render );
require( './routes/parents' )( app, auth, models, render );
require( './routes/children' )( app, auth, models, render );
require( './routes/users' )( app, auth, models, render );

app.get( '/', routes.index );
app.get( '/welcome', auth.restrict, routes.welcome );
app.get( '/login', login.index );
app.post( '/login', login.login );

//new models.users( {name:'Peter Reid', username:'preid', password:'peter'} ).save();

http.createServer( app ).listen( app.get( 'port' ), function ()
{
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
} );
