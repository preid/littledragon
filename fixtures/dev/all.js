var models = require('../../models/sql_models');
var bcrypt = require('bcrypt');

models.Facility.create({name:"Dragon's Den"} ).success( function( facility ){

    models.User.create({username: "preid", firstName: "Peter", lastName: "Reid", password: bcrypt.hashSync("peter", 10),
                       email:"p.e.reid@gmail.com", admin: true, FacilityId: facility.id })
});
