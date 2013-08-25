module.exports = function ( app, auth, models, render )
{
    app.get( "/facilities", auth.restrict, function ( req, res )
    {
        res.render( "facilities" );
    } );

    app.get( "/facility", auth.restrict, function ( req, res )
    {
        res.render( "facility" );
    } );
};