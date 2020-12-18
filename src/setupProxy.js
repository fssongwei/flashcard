const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );

  app.use(
    proxy.createProxyMiddleware("/auth", {
      target: "http://localhost:4000",
      changeOrigin: true,
      pathRewrite: { "^/auth": "" },
    })
  );
};
