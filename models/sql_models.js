var Sequelize = require( "sequelize" );
var sequelize = new Sequelize('c9', 'preid', null,{host:'127.2.109.1', port: 3306, dialect: 'mysql', omitNull: true });

var facility = sequelize.define( 'Facility', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING( 255 ), allowNull: false}
} );
exports.Facility = facility;

var user = sequelize.define( 'User', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING( 50 ), allowNull: false, unique: true},
    firstName: {type: Sequelize.STRING( 100 ), allowNull: false},
    lastName: {type: Sequelize.STRING( 100 ), allowNull: false},
    password: {type: Sequelize.STRING( 100 ), allowNull: false},
    email: {type: Sequelize.STRING( 200 ), allowNull: false, unique: true},
    admin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    facilityAdmin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    createdAt: {type: Sequelize.DATE, allowNull: false},
    updatedAt: {type: Sequelize.DATE, allowNull: false},
    FacilityId: {type: Sequelize.INTEGER, references: "Facilities", referencesKey: "id", allowNull: false }
} );
exports.User = user;

facility.hasMany(user);
user.belongsTo(facility);

var parent = sequelize.define( 'Parent', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    UserId: { type: Sequelize.INTEGER, references: "Users", referencesKey: "id", allowNull: false }
} );
exports.Parent = parent;

parent.belongsTo(user);

var child = sequelize.define( 'Child', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: Sequelize.STRING( 100 ), allowNull: false},
    lastName: {type: Sequelize.STRING( 100 ), allowNull: false},
    nickname: {type: Sequelize.STRING( 100 ), allowNull: false},
    FacilityId: {type: Sequelize.INTEGER, references: "Facilities", referencesKey: "id", allowNull: false }
}, {tableName: "Children"} );
exports.Child = child;

child.hasMany(parent, {joinTableName: 'ParentsChildren'});
parent.hasMany(child, {joinTableName: 'ParentsChildren'});
