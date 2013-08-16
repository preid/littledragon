module.exports = {
    up: function ( migration, DataTypes, done )
    {
        migration.createTable(
            'Facilities',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                name: {type: DataTypes.STRING( 255 ), allowNull: false},
                createdAt: {type: DataTypes.DATE, allowNull: false},
                updatedAt: {type: DataTypes.DATE, allowNull: false}
            }
        );
        done();
    },
    down: function ( migration, DataTypes, done )
    {
        migration.dropTable( 'Facilities' );
        done()
    }
};