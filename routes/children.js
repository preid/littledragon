module.exports = function ( app, auth, models )
{
    app.get( "/children/:id/parents",// auth.restrict,
             function ( req, res )
             {
                 models.children.findById( req.params.id ).populate( "_parent" ).exec(
                     function ( err, data )
                     {
                         res.json( data );
                     } );
             } );
};