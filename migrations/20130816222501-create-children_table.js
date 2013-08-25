module.exports = {
    up: function ( migration, DataTypes, done )
    {
        migration.createTable(
            'Children',
            {
                id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                ParentId: { type: DataTypes.INTEGER, references: "Parents", referencesKey: "id", allowNull: false },
                firstName: {type: DataTypes.STRING( 100 ), allowNull: false},
                lastName: {type: DataTypes.STRING( 100 ), allowNull: false},
                nickname: {type: DataTypes.STRING( 100 ), allowNull: true},
                FacilityId: {type: DataTypes.INTEGER, references: "Facilities", referencesKey: "id", allowNull: false },
                createdAt: {type: DataTypes.DATE, allowNull: false},
                updatedAt: {type: DataTypes.DATE, allowNull: false}
            }
        );
        done();
    },
    down: function ( migration, DataTypes, done )
    {
        migration.dropTable( 'Children' );
        done()
    }
};