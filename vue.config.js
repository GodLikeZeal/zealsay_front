const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].VUE_APP_API_URL = JSON.stringify(
        process.env.VUE_APP_API_URL
      );
      return args;
    });
    if (process.env.NODE_ENV === "production") {
      // #region 启用GZip压缩
      config
        .plugin("compression")
        .use(CompressionPlugin, {
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(() => {});

      // #endregion
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8090",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "api"
        }
      }
    }
  },
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,

  css: {
    extract: false
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  productionSourceMap: undefined,
  parallel: undefined
};
