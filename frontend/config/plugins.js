export const plugins = [
    '~directives/index.js',
    '~ui/ui.js',
    '~plugins/filters',
    '~plugins/axios',
    '~plugins/api',
    '~plugins/lazyload',
    '~plugins/modal',
    {
        src: '~plugins/smoothscroll',
        ssr: false,
    },
    // {
    //     src: '~plugins/mapboxgl',
    //     ssr: false,
    // },
];
