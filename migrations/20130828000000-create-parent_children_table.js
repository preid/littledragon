module.exports = {
    up: function ( migration, DataTypes, done )
    {
        migration.createTable(
            'ParentsChildren',
            {
                ParentId: { type: DataTypes.INTEGER, primaryKey: true, references: "Parents", referencesKey: "id", allowNull: false },
                ChildrenId: { type: DataTypes.INTEGER, primaryKey: true, references: "Children", referencesKey: "id", allowNull: false },
                createdAt: {type: DataTypes.DATE, allowNull: false},
                updatedAt: {type: DataTypes.DATE, allowNull: false}
            }
        );
        done();
    },
    down: function ( migration, DataTypes, done )
    {
        migration.dropTable( 'ParentsChildren' );
        done()
    }
};