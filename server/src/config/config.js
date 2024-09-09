require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8084,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "perrine",
    dialect: process.env.DIALECT || "mysql",
    host: process.env.HOST || "localhost",
    storage: "./sql_database.sql",
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
