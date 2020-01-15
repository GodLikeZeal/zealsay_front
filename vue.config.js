const CompressionPlugin = require("compression-webpack-plugin");
// const webpack = require("webpack");

// 是否为生产环境
const isProduction = process.env.NODE_ENV === "production";

// 本地环境是否需要使用cdn
const devNeedCdn = false;

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    axios: "axios",
    vuetify: "Vuetify",
    "mavon-editor": "mavonEditor",
    "vue-chartist": "chartist",
    jquery: "$"
  },
  // cdn的css链接
  css: [
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
    "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
    "https://cdn.bootcss.com/vuetify/2.1.1/vuetify.min.css",
    "https://unpkg.com/mavon-editor/dist/css/index.css",
    "https://cdn.bootcss.com/chartist/0.11.4/chartist.min.css"
  ],
  // cdn的js链接
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js",
    "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js",
    "https://cdn.bootcss.com/vuetify/2.1.1/vuetify.min.js",
    "https://unpkg.com/mavon-editor/dist/mavon-editor.js",
    "https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js",
    "https://cdn.bootcss.com/chartist/0.11.4/chartist.min.js"
  ]
};

module.exports = {
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].VUE_APP_API_URL = JSON.stringify(
        process.env.VUE_APP_API_URL
      );
      return args;
    });
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });
    // ============注入cdn start============
    config.plugin("html").tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction && devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
    if (isProduction) {
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
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({ bypassOnDebug: true })
        .end();
      // ============压缩图片 end============
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: "jquery",
  //       jQuery: "jquery",
  //       "windows.jQuery": "jquery"
  //     })
  //   ]
  // },
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
    extract: true
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  productionSourceMap: false,
  parallel: undefined
};
