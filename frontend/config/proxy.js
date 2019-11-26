export const proxy = () => ({
    '/graphql': {
        'target': process.env.PROXY_URL,
        'pathRewrite': {
            '^/graphql': '/graphql/',
        },
    },
    '/video': process.env.PROXY_URL,
    '/media': process.env.PROXY_URL,
});
