export const proxy = () => ({
    '/graphql': {
        'target': process.env.PROXY_URL,
        'pathRewrite': {
            '^/graphql': '/graphql/',
        },
    },
    '/api': process.env.PROXY_URL,
    '/video': process.env.PROXY_URL,
    '/media': process.env.PROXY_URL,
});
