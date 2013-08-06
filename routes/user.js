module.exports = function ( app, auth, models )
{
    app.get( "/users", function ( req, res )
    {
        models.users.find( {}, function ( err, data )
        {
            res.json( data );
        } );
    } );
};
