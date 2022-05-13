const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#36A7AA",
              "@primary-1": "#36A7AA",
              "@primary-2": "#2F8C8E",
              "@primary-3": "#40A9FF",
              "@primary-4": "#1890FF",
              "@primary-5": "#096DD9",
              "@border-color-base": "#36A7AA",
              "@icon-color": "#36A7AA",
              "@input-icon-color": "#36A7AA",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
