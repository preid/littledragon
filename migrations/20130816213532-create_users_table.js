module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
        'Users',
        {
            id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            username: {type:DataTypes.STRING(50), allowNull: false, unique: true},
            firstName: {type:DataTypes.STRING(100), allowNull: false},
            lastName: {type:DataTypes.STRING(100), allowNull: false},
            password: {type:DataTypes.STRING(20), allowNull: false},
            email: {type:DataTypes.STRING(200), allowNull: false, unique: true},
            admin: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
            facilityAdmin: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
            facility_id: {type: DataTypes.INTEGER, references: "Facilities", referencesKey: "id", allowNull: false },
            createdAt: {type:DataTypes.DATE, allowNull: false},
            updatedAt: {type:DataTypes.DATE, allowNull: false}
        }
    );
    done();
  },
  down: function(migration, DataTypes, done) {
   migration.dropTable('Users');
    done()
  }
};