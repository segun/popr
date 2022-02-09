const debug = process.env.NODE_ENV !== "production";

module.exports = {
  env: {
    BACKEND_URL: "/wallisconsultancy",
  },
  basePath: '/popr',
  assetPrefix: !debug ? "/popr/" : "",
};
