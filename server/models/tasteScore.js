module.exports = (sequelize, DataTypes) => {
  const TasteScore = sequelize.define(
    'TasteScore',
    {
      score: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER
      },
      recipeId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'tastescore',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  TasteScore.associate = (db) => {
    db.TasteScore.belongsTo(db.Recipe, { 
      foreignKey: 'recipeId',
      onDelete: 'cascade' 
    })
    db.TasteScore.belongsTo(db.User, { foreignKey: 'userId' })
  }

  return TasteScore
}
