export default ({$config, $axios, req}) => {
    $axios.defaults.xsrfCookieName = 'csrftoken';
    $axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const headers = req && req.headers ? Object.assign({}, req.headers) : {};
    $axios.setHeader('X-Forwarded-Host', headers['x-forwarded-host']);
    $axios.setHeader('X-Forwarded-Port', headers['x-forwarded-port']);
    $axios.setHeader('X-Forwarded-Proto', headers['x-forwarded-proto']);

    let endpoint;
    if ($config.proxyUrl) {
        endpoint = $config.proxyUrl;
    } else if ($config.backendUrl) {
        endpoint = $config.backendUrl;
    } else {
        endpoint = 'http://backend:8000/';
    }

    if (process.client) {
        endpoint = `${location.origin}/`;
    }
    $axios.setBaseURL(endpoint);
};
