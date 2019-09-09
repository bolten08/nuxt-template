import pkg from './package';
import path from 'path';
import fs from 'fs';

const StyleLintPlugin = require('stylelint-webpack-plugin');
require('dotenv').config();

import {plugins} from './config/plugins';


module.exports = {
    mode: 'universal',

    // env: {
    //     frontendUrl: process.env.FRONTEND_URL,
    // },

    server: process.env.HTTPS_KEY && process.env.HTTPS_CERT ? {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_KEY)),
            cert: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_CERT)),
        },
    } : {},

    render: {
        http2: {
            push: true,
        },
    },

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description},
            // Favicons
            // {name: 'msapplication-TileColor', content: '#ffffff'},
            // {name: 'theme-color', content: '#ffffff'},
        ],
        link: [
            // Favicons
            // {rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico'},
            // {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png'},
            // {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png'},
            // {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png'},
            // {rel: 'manifest', href: '/favicons/site.webmanifest'},
            // {rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#000000'},
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {color: '#000'},

    /*
     ** Global CSS
     */
    css: [
        '~/assets/scss/vendors.scss',
        '~/assets/scss/main.scss',
    ],

    styleResources: {
        scss: '~/assets/scss/shared/*.scss',
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins,

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
    ],

    router: {
        linkActiveClass: '_active-link',
        linkExactActiveClass: '_exact-link',
    },

    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.API_URL || 'http://backend:8000',
        browserBaseURL: '/',
        proxy: process.env.PROXY || false,
        // https: true,
    },

    proxy: {
        '/api': process.env.API_URL || 'https://alia.idacloud.ru',
        '/media': process.env.API_URL || 'https://alia.idacloud.ru',
    },

    /*
     ** Build configuration
     */
    build: {
        publicPath: '/n/',

        //analyze: true,
        /*
         ** You can extend webpack config here
         */
        postcss: {
            // Add plugin names as key and arguments as value
            // Install them before as dependencies with npm or yarn
            preset: {
                // Change the postcss-preset-env settings
                autoprefixer: {
                    grid: true,
                },
            },
        },

        extend(config, ctx) {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty',
            };

            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });

                config.plugins.push(
                    new StyleLintPlugin({
                        files: ['**/*.scss', '**/*.vue'],
                        failOnError: false,
                        quiet: false,
                    }),
                );
            }
        },
    },
};
