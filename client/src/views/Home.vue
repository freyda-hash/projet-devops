<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
        <FilterComponent />
        <ProductList class="mt-5" />
    </b-container>
    <MyFooter class="mt-5"  />

  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import FilterComponent from "@/components/Products/FilterComponent.vue";
import ProductList from "@/components/Products/ProductList.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Products",
  components: {
    TopHeader,
    FilterComponent,
    ProductList,
    MyFooter,
  },

  data() {
    return {};
  },
  computed: {},
  async mounted() {
    await this.$store.dispatch("Products/setSearchParameter", this.$route);
    await this.$store.dispatch("Products/setAllProducts");
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
