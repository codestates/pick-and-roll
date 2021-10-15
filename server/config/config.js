const dotenv = require('dotenv')
dotenv.config()

const config = {
  development: {
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_DBNAME,
    host: process.env.LOCAL_DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
}

const nodeEnv = process.env.NODE_ENV || 'development'

module.exports = config[nodeEnv]