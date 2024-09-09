import store from "@/store";
import AboutUs from "@/views/AboutUs.vue";
import ADashboard from "@/views/Admin/ADashboard.vue";
import AOrder from "@/views/Admin/AOrder.vue";
import AOrders from "@/views/Admin/AOrders.vue";
import AProfile from "@/views/Admin/AProfile.vue";
import AUsers from "@/views/Admin/AUsers.vue";
import AddProduct from "@/views/Admin/AddProduct.vue";
import Checkout from "@/views/BuyProduct/Checkout.vue";
import Order from "@/views/BuyProduct/ViewOrder.vue";
import NotFound from "@/views/ErrorPage/NotFound.vue";
import Unauthorized from "@/views/ErrorPage/Unauthorized.vue";
import Home from "@/views/Home.vue";
import SuccessPayment from "@/views/PayMoney/SuccessPayment.vue";
import ProductDetails from "@/views/Product/ProductDetails.vue";
import Login from "@/views/User/Login.vue";
import UserProfile from "@/views/User/Profile.vue";
import Register from "@/views/User/Register.vue";
import ResetPassword from "@/views/User/ResetPassword.vue";
import CartView from "@/views/UsersProduct/CartView.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home | Phone-Shop" },
  },
  {
    path: "/product/:productId",
    name: "product-details",
    component: ProductDetails,
    meta: { title: "Product details | Phone-Shop" },
  },
  {
    path: "/cart-view",
    name: "cart-view",
    component: CartView,
    meta: { title: "Cart | Phone-Shop" },
  },

  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: { title: "Checkout | Phone-Shop" },
  },
  {
    path: "/order/:sessionId",
    name: "order",
    component: Order,
    meta: { title: "Order details | Phone-Shop" },
  },
  {
    path: "/success-payment",
    name: "success-payment",
    component: SuccessPayment,
    meta: { title: "Success payment | Phone-Shop" },
  },
  {
    path: "/about-us",
    name: "about-us",
    component: AboutUs,
    meta: { title: "About us | Phone-Shop" },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { title: "Register | Phone-Shop" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login | Phone-Shop" },
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
    meta: { title: "Profile | Phone-Shop" },
  },
  {
    path: "/reset-password/:token",
    name: "reset-password",
    component: ResetPassword,
    meta: { title: "Reset password | Phone-Shop" },
  },
  {
    path: "/admin",
    name: "admin",
    component: ADashboard,
    meta: { requiresAuth: true, title: "Admin panel | Phone-Shop" },
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: AUsers,
    meta: { requiresAuth: true, title: "Shop users | Phone-Shop" },
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: AOrders,
    meta: { requiresAuth: true, title: "Order list | Phone-Shop" },
  },
  {
    path: "/admin/order/:orderId",
    name: "admin-order",
    component: AOrder,
    meta: { requiresAuth: true, title: "Order details | Phone-Shop" },
  },
  {
    path: "/admin/profile",
    name: "admin-profile",
    component: AProfile,
    meta: { requiresAuth: true, title: "Admin profile | Phone-Shop" },
  },
  {
    path: "/admin/add-product",
    name: "admin-add-product",
    component: AddProduct,
    meta: { requiresAuth: true, title: "Add product | Phone-Shop" },
  },
  {
    path: "/error/401",
    name: "unauthorized",
    component: Unauthorized,
    meta: { title: "Unauthorized | Phone-Shop" },
  },
  {
    path: "/*",
    name: "not-found",
    component: NotFound,
    meta: { title: "Not found | Phone-Shop" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const admin = store.state.CurrentUser.admin;
  if (requiresAuth && !admin) {
    next("/error/401");
  } else if (requiresAuth && admin) {
    next();
  } else {
    next();
  }
});

export default router;
