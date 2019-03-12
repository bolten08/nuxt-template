const StyleLintPlugin = require('stylelint-webpack-plugin');
require('dotenv').config();

module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Nuxt Template',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt Template'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        '~/assets/styles/vendors',
        '~/assets/styles/main'
    ],

    styleResources: {
        scss: '~/assets/styles/shared/*.scss'
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {
            src: '~/plugins/filters.js',
            ssr: true
        },
        {
            src: '~/plugins/axios.js',
            ssr: true
        }
    ],

    router: {
        linkActiveClass: '_active-link',
        linkExactActiveClass: '_active-exact'
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });

                config.plugins.push(
                    new StyleLintPlugin({
                        files: ['**/*.scss', '**/*.vue'],
                        failOnError: false,
                        quiet: false
                    })
                );
            }
        }
    }
};
