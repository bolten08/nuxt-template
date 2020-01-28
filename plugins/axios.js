export default ({$axios, req}) => {
    $axios.defaults.xsrfCookieName = 'csrftoken';
    $axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const headers = req && req.headers ? Object.assign({}, req.headers) : {};
    $axios.setHeader('X-Forwarded-Host', headers['x-forwarded-host']);
    $axios.setHeader('X-Forwarded-Port', headers['x-forwarded-port']);
    $axios.setHeader('X-Forwarded-Proto', headers['x-forwarded-proto']);

    let endpoint;
    if (process.env.PROXY_URL) {
        endpoint = process.env.PROXY_URL;
    } else if (process.env.BACKEND_HOST) {
        endpoint = `http://${process.env.BACKEND_HOST}:8000/`;
    } else {
        endpoint = 'http://backend:8000/';
    }

    if (process.client) {
        endpoint = `${location.origin}/`;
    }
    $axios.setBaseURL(endpoint);

};
