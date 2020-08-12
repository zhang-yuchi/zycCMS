module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'internet': '@/internet',
        'views': '@/views',
        'common': '@/common',
        'validator':"@/validator"
      }
    }
  },

  publicPath: './'
}