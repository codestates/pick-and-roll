const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.User = require('./user')(sequelize, Sequelize)
db.Recipe = require('./recipe')(sequelize, Sequelize)
db.TasteScore = require('./tasteScore')(sequelize, Sequelize)
db.EasyScore = require('./easyScore')(sequelize, Sequelize)
db.Favorite = require('./favorite')(sequelize, Sequelize)
db.Comment = require('./comment')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
