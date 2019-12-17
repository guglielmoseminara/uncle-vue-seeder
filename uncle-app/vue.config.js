module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/main.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views$: require("path").resolve(__dirname, "src/views")
      }
    }
  }
};