module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      recipeId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'favorite',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  Favorite.associate = (db) => {
    db.Favorite.belongsTo(db.User, { foreignKey: 'userId' })
    db.Favorite.belongsTo(db.Recipe, { 
      foreignKey: 'recipeId',
      onDelete: 'cascade' 
    })
  }

  return Favorite
}
