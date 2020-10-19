import dotenvExtended from 'dotenv-extended'

import { locales, defaultLocale } from './locales/config'

dotenvExtended.load()

module.exports = {
    mode: 'universal',
    env: {
        ...process.env,
        locales,
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
    },
    buildModules: ['@nuxt/typescript-build'],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: 'AIzaSyBOwoaXNg1NYfXnFz_NnY3uZmsTHz_foh4',
                    authDomain: 'friggo-637ec.firebaseapp.com',
                    databaseURL: 'https://friggo-637ec.firebaseio.com',
                    projectId: 'friggo-637ec',
                    storageBucket: 'friggo-637ec.appspot.com',
                    messagingSenderId: '421354873351',
                    appId: '1:421354873351:web:6e3f40f869f1d68bf480a2',
                    measurementId: 'G-8QZH82X19H',
                },
                services: {
                    auth: true, // Just as example. Can be any other service.
                },
            },
        ],
        [
            'nuxt-i18n',
            {
                strategy: 'prefix_except_default',
                locales,
                defaultLocale,
                vueI18n: {
                    fallbackLocale: defaultLocale,
                },
                vuex: {
                    syncLocale: true,
                },
                lazy: true,
                langDir: 'locales/',
                differentDomains: process.env.APP_ENV === 'prod',
            },
        ],
        ['~/.build/merge-and-compare-locales.js', { defaultLocale }],
    ],
    plugins: ['~/plugins/storeActions/'],
    css: [
        // Import platform-ui default styles
        { src: '~/assets/scss/normalize.scss', lang: 'scss' },
        { src: '~/assets/scss/fonts.scss', lang: 'scss' },
        { src: '~/assets/scss/global.scss', lang: 'scss' },
    ],
    styleResources: {
        scss: [
            // DO NOT import global styles here.
            // Only shared functionnal scss as it will slow down whole build and clutter the package
            '~/assets/scss/_variables.scss',
        ],
    },
    watch: ['~/locales/*/*.json'],
    /* Used to allow nuxt hot reload when dockerized */
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000,
            // poll: true,
        },
    },
    build: {
        extend: (config: any, context: any) => {
            if (context.isDev) {
                config.devtool = context.isClient
                    ? 'eval-source-map'
                    : 'inline-source-map'
            }

            if (context.isClient) {
                // Run ESLint on save
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(ts|js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true,
                    },
                })
            }
        },
    },
}
