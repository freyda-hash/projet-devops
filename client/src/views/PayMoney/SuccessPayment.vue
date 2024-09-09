<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="6" class="text-center">
          <b-card
            border-variant="primary"
            header="Payment Succeeded"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-button size="lg" disabled variant="primary">
              <b-icon icon="check" scale="3" />
            </b-button>
            <h1 class="mt-4">You're all set!</h1>
            <h6>Thanks for your purchase!</h6>
            <h6>We'll deliver your order in few days.</h6>
            <b-card-footer class="mt-4">Phone Shop </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import OrderService from "@/services/OrderService.js";
export default {
  name: "SuccessPayment",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {
      order: {},
      session: {},
      validSession: false,
    };
  },
  async mounted() {
    this.$store.dispatch("Cart/clearCart");
    const lineItems = this.session.line_items.data;
    const shipCost = lineItems[lineItems.length - 1].amount_total;
    try {
      this.order = (
        await OrderService.createOrder({
          name: this.session.metadata.customerName,
          email: this.session.customer_email,
          address: this.session.metadata.shippingAddress,
          status: "paid",
          variant: "dark",
          productCost: (this.session.amount_total - shipCost) / 100,
          currency: this.session.currency.toUpperCase(),
          shippingCost: shipCost / 100,
        })
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
};
</script>

<style lang="scss" scoped></style>
