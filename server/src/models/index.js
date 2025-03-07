const config = require("../config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: config.db.dialect,
    host: config.db.host,
    storage: config.db.storage,
  }
);

const db = {};
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.OrderItem = require("./OrderItem")(sequelize, Sequelize.DataTypes);
db.Product = require("./Product")(sequelize, Sequelize.DataTypes);
db.Review = require("./Review")(sequelize, Sequelize.DataTypes);
db.Order = require("./Order")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
