var express = require( 'express' )
    , routes = require( './routes' )
    //, rest = require( './routes/rest' )
    , http = require( 'http' )
    , path = require( 'path' )
    , models = require( './models/models' )
    , auth = require( './security/authentication.js' )
    , login = require( './routes/login' )
    , fs = require('fs');

var app = express();

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

/*var controllers_path = __dirname + '/app/routes', controller_files = fs.readdirSync( controllers_path );
controller_files.forEach( function ( file )
                          {
                              require( controllers_path + '/' + file )( app )
                          } );*/
require( './routes/rest' )( app, auth, models );
require( './routes/parents' )( app, auth, models );
require( './routes/children' )( app, auth, models );

app.get( '/', routes.index );
app.get( '/welcome', auth.restrict, routes.welcome );
//app.get( '/users', user.list );
app.get( '/login', login.index );
app.post( '/login', login.login );

//new models.users( {name:'Peter Reid', username:'preid', password:'peter'} ).save();

http.createServer( app ).listen( app.get( 'port' ), function ()
{
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
} );
