const CracoLessPlugin = require('craco-less')

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#9a77cf' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
