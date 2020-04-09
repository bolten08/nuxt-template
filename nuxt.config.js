// import path from 'path';
// import fs from 'fs';

const StyleLintPlugin = require('stylelint-webpack-plugin');
require('dotenv').config();

import { plugins } from './config/plugins';
import { proxy } from './config/proxy';

module.exports = {
    mode: 'universal',

    render: {
        http2: {
            push: true
        }
    },

    /**
     * Раскоментить блок ниже, если необходимо локалку запустить по https.
     * В env добавить 2 переменные HTTPS_KEY и HTTPS_CERT, которые являются путями до сертификатов
     */
    // server: process.env.HTTPS_KEY && process.env.HTTPS_CERT ? {
    //     https: {
    //         key: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_KEY)),
    //         cert: fs.readFileSync(path.resolve(__dirname, process.env.HTTPS_CERT)),
    //     },
    // } : {},

    /**
     * Метатеги, фавиконки и т.п
     * Для генерации фавиконок - https://realfavicongenerator.net/
     */
    head: {
        htmlAttrs: {
            lang: 'ru'
        },
        title: 'Шаблон Nuxt проекта',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Шаблон Nuxt проекта'
            },
            /* Favicons */
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'theme-color', content: '#ffffff' }
        ],
        link: [
            /* Favicons */
            { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
            { rel: 'manifest', href: '/favicons/site.webmanifest' },
            { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#000000' }
        ]
    },

    /**
     * Кастомизация прогрес бара. Можно передать свой кастомный компонент
     * Подробнее смотри тут https://nuxtjs.org/api/configuration-loading#using-a-custom-loading-component
     * и тут https://nuxtjs.org/examples/custom-loading
     */
    loading: { color: '#000' },

    /**
     * Подключаем файл с вендорными стилями и файл с общими стилями
     */
    css: [
        '~/assets/scss/vendors.scss', 
        '~/assets/scss/common.scss'
    ],

    /**
     * Миксины и переменные доступны во всех компонентам и во всех scss файлах
     */
    styleResources: {
        scss: '~/assets/scss/shared/*.scss'
    },

    /**
     * Sentry config
     */
    sentry: {
        dsn: process.env.SENTRY_DSN || false
    },

    /**
     * Плагины. Вынесены в отдельеный файл
     */
    plugins,

    /**
     * Модули
     */
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
        'nuxt-polyfill'
    ],

    /**
     * Nuxt Polyfills
     */
    polyfill: {
        features: [
            {
                require: 'intersection-observer',
                detect: () => 'IntersectionObserver' in window
            },
            {
                require: 'smoothscroll-polyfill',
                detect: () =>
                    'scrollBehavior' in document.documentElement.style &&
                    window.__forceSmoothScrollPolyfill__ !== true,
                install: smoothscroll => smoothscroll.polyfill()
            }
        ]
    },

    /**
     * В настройках роутера меняет классы для активных ссылок
     */
    router: {
        linkActiveClass: '_active-link',
        linkExactActiveClass: '_exact-link'
    },

    /**
     * Модуль прокси решает проблемы с CORS, используется только на локалке
     */
    proxy: process.env.PROXY_URL ? proxy() : {},

    /**
     * Тут можно внести изменения в настройки сборки и webpack
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
                    grid: true
                }
            }
        },

        extend(config, ctx) {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty'
            };

            if (ctx.isDev && ctx.isClient) {
                /**
                 * Линтим js и vue
                 */
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });

                /**
                 * Линтим scss
                 */
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
