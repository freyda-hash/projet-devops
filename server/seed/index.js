const {
  sequelize,
  User,
  Order,
  OrderItem,
  Product,
  Review,
} = require("../src/models");

const Promise = require("bluebird");
const users = require("./users.json");
const orders = require("./orders.json");
const orderItems = require("./orderItems.json");
const products = require("./products.json");
const reviews = require("./reviews.json");

sequelize.sync({ force: true }).then(async () => {
  await Promise.all(
    users.map((user) => {
      User.create(user);
    })
  );
  await Promise.all(
    products.map((product) => {
      Product.create(product);
    })
  );
  await Promise.all(
    reviews.map((review) => {
      Review.create(review);
    })
  );
  await Promise.all(
    orders.map((order) => {
      Order.create(order);
    })
  );
  await Promise.all(
    orderItems.map((orderItem) => {
      OrderItem.create(orderItem);
    })
  );
});
