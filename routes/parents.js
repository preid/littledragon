module.exports = function ( app, auth, models )
{
    models.parents.findById( "5200a0d5f53f3fa81b000001", function(err, pr){
        models.children.findById("5200a09474a50c781a000001", function(err, child){
          pr._children.push( child );
          pr.save();
        });});

        app.get( "/parents/:id/children",// auth.restrict,
             function ( req, res )
             {
                 models.parents.findById( req.params.id ).populate("_children" ).exec(
                     function ( err, data )
                      {
                          res.json( data );
                      }) ;
             } );
};