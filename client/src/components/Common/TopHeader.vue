<template>
  <div>
    <b-row>
      <b-col>
        <b-navbar
          class="py-3"
          toggleable="lg"
          type="dark"
          style="background-color: #00283a"
        >
          <b-navbar-brand href="/">
             <span> Phone Shop</span>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-top-header-collapse" />
          <b-collapse id="nav-top-header-collapse" is-nav>
            <b-navbar-nav class="mr-auto">        

              <b-nav-form class="mr-auto" v-on:submit.prevent="search">
                <b-form-input
                  class="mr-sm-2 searchField"
                  v-model="searchTxt"
                  placeholder="Search..."
                />
              </b-nav-form>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
            
              <b-nav-item class="mr-auto" to="/cart-view">
                <div>
                  <b-icon icon="cart2" />
                  Cart
                </div>
              </b-nav-item>
              <b-nav-item class="mr-auto" v-if="userLoggedIn">
                <b-img height="35px" width="35px" :src="user.profileImage" />
              </b-nav-item>
              <b-nav-item-dropdown class="mr-auto" right v-if="userLoggedIn">
                <template #button-content>
                  <em v-if="user.username" style="color: #fff">
                    {{ user.username }}
                  </em>
                  <em v-if="!user.username" style="color: #fff">
                    {{ user.firstName }} {{ user.lastName }}
                  </em>
                </template>
                <b-dropdown-item v-if="admin" to="/admin">
                  Admin Panel
                </b-dropdown-item>
                <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-button
                class="mr-auto ml-3"
                v-if="!userLoggedIn"
                pill
                variant="success"
                to="/login"
              >
                Login / Register
              </b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
    <hr class="m-0" style="background-color: #000" />
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      user: {},
      admin: false,
      userLoggedIn: false,
      searchTxt: "",
    };
  },
  async mounted() {
    this.user = this.$store.state.CurrentUser.user;
    this.admin = this.$store.state.CurrentUser.admin;
    this.userLoggedIn = this.$store.state.CurrentUser.userLoggedIn;
  },
  computed: {},
  methods: {
   
    async logout() {
      this.$store.dispatch("CurrentUser/setToken", "");
      this.$store.dispatch("CurrentUser/setUser", {});
      window.location.reload();
    },
   
    search() {
      var newRoute = "/";
      if (this.searchTxt.trim() != "") {
        const text = this.searchTxt.trim();
        newRoute += "?q=" + text;
        this.$router.push({ path: newRoute });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
