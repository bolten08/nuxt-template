export default ({ $axios, req }) => {
    if (process.server) {
        $axios.defaults.baseURL =
            process.env.backendUrl || 'http://backend:8000';
    } else {
        $axios.defaults.baseURL =
            process.env.backendUrl || window.location.origin;
    }

    const headers = req && req.headers ? Object.assign({}, req.headers) : {};

    $axios.setHeader('X-Forwarded-Host', headers['x-forwarded-host']);
    $axios.setHeader('X-Forwarded-Port', headers['x-forwarded-port']);
};
