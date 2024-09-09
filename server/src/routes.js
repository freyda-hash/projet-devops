const isAuthenticated = require("./policies/isAuthenticated");
const UserController = require("./controllers/UserController");
const ImageController = require("./controllers/ImageController");
const OrderController = require("./controllers/OrderController");
const ReviewController = require("./controllers/ReviewController");
const ProductsController = require("./controllers/ProductsController");
const OrderItemController = require("./controllers/OrderItemController");
const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = (app) => {
  // authentication
  app.post(
    "/api/auth/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/api/auth/login", AuthenticationController.login);
  app.get(
    "/api/auth/verifyPassword/:password",
    isAuthenticated,
    AuthenticationController.verifyPassword
  );
  app.post(
    "/api/auth/updatePassword",
    isAuthenticated,
    AuthenticationControllerPolicy.updatePassword,
    AuthenticationController.updatePassword
  );
  app.post(
    "/api/auth/requestPasswordToken",
    AuthenticationController.requestPasswordToken
  );
  app.get(
    "/api/auth/verifyPasswordToken/:token",
    AuthenticationController.verifyPasswordToken
  );
  app.post("/api/auth/resetPassword", AuthenticationController.resetPassword);

  // order
  app.get("/api/order/getOrderList", OrderController.getOrderList);
  app.get("/api/order/getOrder/:orderId", OrderController.getOrder),
    app.get(
      "/api/order/getOrderBySessionId/:sessionId",
      OrderController.getOrderBySessionId
    ),
    app.post("/api/order/createOrder", OrderController.createOrder);
  app.put(
    "/api/order/updateOrder",
    isAuthenticated,
    OrderController.updateOrder
  );
  app.delete(
    "/api/order/deleteOrder/:orderId",
    isAuthenticated,
    OrderController.deleteOrder
  );

  // order item
  app.get(
    "/api/orderItem/getOrderItemList/:orderId",
    isAuthenticated,
    OrderItemController.getOrderItemList
  );
  app.post(
    "/api/orderItem/createOrderItem",
    OrderItemController.createOrderItem
  );
  app.delete(
    "/api/orderItem/deleteOrderItem/:orderItemId",
    isAuthenticated,
    OrderItemController.deleteOrderItem
  );

  // product
  app.get("/api/products/getAllProducts", ProductsController.getAllProducts);
  app.get(
    "/api/products/topSellProduct/:limit",
    ProductsController.topSellProduct
  );
  app.get(
    "/api/products/newAddProduct/:limit",
    ProductsController.newAddProduct
  );
  app.get(
    "/api/products/getProductSales/:productId",
    ProductsController.getProductSales
  );
  app.get("/api/products/getProduct/:productId", ProductsController.getProduct);
  app.get(
    "/api/products/getProductId/:productTitle",
    ProductsController.getProductId
  );
  app.get(
    "/api/products/getProductRating/:productId",
    ProductsController.getProductRating
  );
  app.post(
    "/api/products/createProduct",
    ImageController.uploadProductImage,
    ProductsController.createProduct
  );
  app.put("/api/products/updateProduct", ProductsController.updateProduct);
  app.delete(
    "/api/products/deleteProduct/:productId",
    ProductsController.deleteProduct
  );

  // review
  app.get(
    "/api/review/getReviewList/:productId",
    ReviewController.getReviewList
  );
  app.get(
    "/api/review/getUsersReviewList/:userId",
    ReviewController.getUsersReviewList
  );
  app.post(
    "/api/review/createReview",
    isAuthenticated,
    ReviewController.createReview
  );
  app.put(
    "/api/review/updateReview",
    isAuthenticated,
    ReviewController.updateReview
  );
  app.delete(
    "/api/review/deleteReview/:reviewId",
    isAuthenticated,
    ReviewController.deleteReview
  );

  // user
  app.get(
    "/api/user/checkUserName/:userName",
    isAuthenticated,
    UserController.checkUserName
  );
  app.delete(
    "/api/user/deleteAccount/:userId",
    isAuthenticated,
    UserController.deleteAccount
  );
  app.get("/api/user/getUserById/:userId", UserController.getUserById);
  app.get("/api/user/getUserList", isAuthenticated, UserController.getUserList);
  app.post("/api/user/updateUser", isAuthenticated, UserController.updateUser);
  app.get("/api/user/getUserByEmail/:email", UserController.getUserByEmail);
};
