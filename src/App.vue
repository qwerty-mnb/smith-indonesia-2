<template>
  <router-view :key="$route.fullPath" />
</template>
<style lang="scss">
// Font Awesome
$fa-font-path: "/webfonts";
@import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
@import "@fortawesome/fontawesome-free/scss/solid.scss";
// Sweetalert 2
@import "sweetalert2/dist/sweetalert2.css";
// Element Plus
@import "element-plus/dist/index.css";

// Custom
@import "./src/assets/scss/jackpot.scss";
@import "./src/assets/scss/home.scss";
@import "./src/assets/scss/style.scss";
@import "./src/assets/scss/theme-dark.scss";
@import "./src/assets/scss/slick.scss";
@import "./src/assets/scss/default.min.scss";
@import "./src/assets/scss/font-awesome.scss";
@import "./src/assets/scss/mobile.scss";
</style>
