<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-container class="mt-5">
      <b-row align-v="center">
        <b-col>
          <h3>Hello {{ user.firstName }} {{ user.lastName }},</h3>
          <h5>Welcome to admin dashboard</h5>
        </b-col>
        <b-col>
          <img src="/img/svg/overview.svg" alt="" width="300" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ATopHeader from "@/components/Admins/ATopHeader.vue";
export default {
  name: "AOverview",
  components: {
    ATopHeader,
  },
  data() {
    return {
      user: this.$store.state.CurrentUser.user,
    };
  },
};
</script>

<style lang="scss" scoped></style>
