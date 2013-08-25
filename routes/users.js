module.exports = function ( app, auth, models, render )
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

    app.get("/users/facility", auth.restrict, function( req, res)
    {
        models.User.findAll( {include: [models.Facility]} ).complete( render( req, res ) );
    } );
};
