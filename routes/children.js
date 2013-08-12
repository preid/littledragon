module.exports = function ( app, auth, models, render )
{
    app.get( "/children", auth.restrict, function ( req, res )
    {
        res.render( "children" );
    } );

    app.get( "/rest/children/:id/parents", auth.restrict,
             function ( req, res )
             {
                 models.children.findById( req.params.id ).populate( "_parent" ).exec( render( req, res ) );
             } );
};