<template>
  <div class="" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>

<style>
  #sidenav-main {
    z-index: 1;
  }
  @media (min-width: 768px) {
    .app-content {
      margin-left: 250px;
    }
  }
</style>
