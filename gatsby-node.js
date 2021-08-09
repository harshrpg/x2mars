/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
     resolve: {
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          util: require.resolve("util/"),
        },
      },
    })
  }