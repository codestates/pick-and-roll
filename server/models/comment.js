module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.STRING(200),
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
      tableName: 'comment',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  )

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User, { foreignKey: 'userId' })
    db.Comment.belongsTo(db.Recipe, { 
      foreignKey: 'recipeId',
      onDelete: 'cascade' 
    })
  }

  return Comment
}
