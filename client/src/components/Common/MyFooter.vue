<template>
  <div style="background: #1f2e50; color: #ffffff">
    <b-container class="pb-4">
      <b-row class="pt-5 pb-4">
        <b-col cols="5">
          <h2>
            <strong>Company Name</strong>
          </h2>
          <p>Company Description</p>
        </b-col>
        <b-col cols="3">
          <h3>Links</h3>
          <b-link href="#">Company Profile</b-link><br />
          <b-link href="#">Terms &amp; Conditions</b-link><br />
          <b-link href="#">Privacy Policy</b-link><br />
        </b-col>
        <b-col cols="4">
          <h3>Location</h3>
         <span>Company Address</span>
          <div class="mt-3">
            <b-icon icon="envelope" /> Company Email <br />
          </div>
        </b-col>
      </b-row>
      <hr />
      <h5>© 2023, All rights reserved</h5>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style scoped lang="scss">
#footer {
  bottom: 0px;
}
</style>
