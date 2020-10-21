import dotenvExtended from 'dotenv-extended'

import { locales, defaultLocale } from './locales/config'

dotenvExtended.load()

module.exports = {
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
        '@nuxtjs/pwa',
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        'nuxt-buefy',
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.FIREBASE_APP_ID,
                    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
                },
                services: {
                    auth: {
                        persistence: 'local',
                        ssr: true,
                    },
                    firestore: true,
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
                differentDomains: false,
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
    firebase: {},
    pwa: {
        // disable the modules you don't need
        meta: false,
        icon: false,
        // if you omit a module key form configuration sensible defaults will be applied
        // manifest: false,

        workbox: {
            importScripts: [
                // ...
                '/firebase-auth-sw.js',
            ],
            // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
            // only set this true for testing and remember to always clear your browser cache in development
            dev: true,
        },
    },
}
