module.exports = function ( app, auth, models )
{
    app.get( "/parents", auth.restrict, function ( req, res )
        {
            res.render("parents");
        } );

    app.get( "/rest/parents/:id/children", auth.restrict,
             function ( req, res )
             {
                 models.parents.findById( req.params.id ).populate( "_children" ).exec(
                     function ( err, data )
                     {
                         res.json( data );
                     } );
             } );

    app.get( "/rest/parents_user", auth.restrict,
                 function ( req, res )
                 {
                     models.parents.find().populate( "_user" ).exec(
                         function ( err, data )
                         {
                             res.json( data );
                         } );
                 } );
};