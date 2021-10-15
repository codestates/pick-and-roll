module.exports = (sequelize, DataTypes) => {
  const EasyScore = sequelize.define(
    'EasyScore',
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
      tableName: 'easyscore',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  EasyScore.associate = (db) => {
    db.EasyScore.belongsTo(db.Recipe, { 
      foreignKey: 'recipeId',
      onDelete: 'cascade' 
    })
    db.EasyScore.belongsTo(db.User, { foreignKey: 'userId' })
  }

  return EasyScore
}
