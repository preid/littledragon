module.exports = {
    up: function ( migration, DataTypes, done )
    {
        migration.createTable(
            'Parents',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                UserId: { type: DataTypes.INTEGER, references: "Users", referencesKey: "id", allowNull: false },
                createdAt: {type: DataTypes.DATE, allowNull: false},
                updatedAt: {type: DataTypes.DATE, allowNull: false}
            }
        );
        done();
    },
    down: function ( migration, DataTypes, done )
    {
        migration.dropTable( 'Parents' );
        done()
    }
};