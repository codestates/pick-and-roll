module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    'Recipe',
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      introduction: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      mainImg: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      requiredTime: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      contentImg: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'recipe',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  )

  Recipe.associate = (db) => {
    db.Recipe.belongsTo(db.User, { foreignKey: 'userId' })
    db.Recipe.hasMany(db.TasteScore, { foreignKey: 'recipeId' })
    db.Recipe.hasMany(db.EasyScore, { foreignKey: 'recipeId' })
    db.Recipe.hasMany(db.Comment, { foreignKey: 'recipeId' })
    db.Recipe.hasMany(db.Favorite, { foreignKey: 'recipeId' })
  }

  return Recipe
}
