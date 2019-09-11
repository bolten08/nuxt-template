export const plugins = [
    '~ui/ui.js',
    '~plugins/filters',
    '~plugins/axios',
    '~plugins/api',
    '~plugins/lazyload',
    '~plugins/modal',
    {
        src: '~plugins/clickoutside',
        ssr: false,
    },
    {
        src: '~plugins/smoothscroll',
        ssr: false,
    },
    // {
    //     src: '~plugins/mapboxgl',
    //     ssr: false,
    // },
];
