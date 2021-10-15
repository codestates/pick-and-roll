module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: 'user',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  User.associate = (db) => {
    db.User.hasMany(db.Recipe, { foreignKey: 'userId' })
    db.User.hasMany(db.TasteScore, { foreignKey: 'userId' })
    db.User.hasMany(db.EasyScore, { foreignKey: 'userId' })
    db.User.hasMany(db.Comment, { foreignKey: 'userId' })
    db.User.hasMany(db.Favorite, { foreignKey: 'userId' })
  }

  return User
}