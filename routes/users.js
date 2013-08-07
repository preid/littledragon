module.exports = function ( app, auth, models )
{
    app.get( "/users", auth.restrict, function ( req, res )
    {
        res.render( "users" );
    } );

    app.get( "/user", auth.restrict, function ( req, res )
    {
        res.render( "user" );
    } );

    app.get("/currentUser", function( req, res )
    {
        res.send( req.session.user );
    } );
};
