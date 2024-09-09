import Vue from "vue";
import Vuex from "vuex";
import { CartModule } from "./Cart.js";
import { ReviewModule } from "./Review.js";
import { ProductsModule } from "./Products.js";
import { CheckoutModule } from "./Checkout.js";
import { CurrentUserModule } from "./CurrentUser.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    Cart: CartModule,
    Review: ReviewModule,
    Products: ProductsModule,
    Checkout: CheckoutModule,
    CurrentUser: CurrentUserModule,
  },
});
