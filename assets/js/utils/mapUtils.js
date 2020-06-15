let L;
if (process.browser) {
    L = require('leaflet');
}

export const mapToken = 'pk.eyJ1IjoiYWxpYS1uZXciLCJhIjoiY2p5eWJ5ZHVwMWRhcjNjbnlpdXF4b3dndyJ9.4cKBOcifzUTnmy59iNfOlQ';
// export const mapStyles = `https://api.mapbox.com/styles/v1/alia-new/cjze30p7e01ap1cpb7uvep973/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`;
export const mapStyles = 'https://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU';

export function initMap(container, options = {}) {
    if (!container) {
        console.warn('[mapUtils/initMap] Не укзаан контейнер для карты');
        return;
    }

    const defaultOptions = {
        center: [55.777923, 37.544270],
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,
        crs: L.CRS.EPSG3395,
    };

    try {
        return L.map(container, {...defaultOptions, ...options});
    } catch (e) {
        console.error('[mapUtils/initMap] Не удалось инициализировать карту.\n', e);
    }
}

export function getTileLayer() {
    return L.tileLayer(mapStyles, {
        subdomains: ['01', '02', '03', '04'],
        attribution: '<a href="https://yandex.ru/" target="_blank">Яндекс</a>',
        reuseTiles: true,
        updateWhenIdle: false,
    });
}

export function genHtmlMarker(coords, html) {
    const defaultHtmlMarker = `
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="26" fill="#66BFE6"/>
            <path d="M40.7476 39H46L32.11 20L18 38.9897H23.2992L26.104 35.3419H34.5561L32.1055 31.8693H28.7129L32.1417 27.3412L40.7476 39Z" fill="#384044"/>
        </svg>
    `;

    let icon = L.divIcon({
        iconSize: null,
        html: html ? html : defaultHtmlMarker,
    });

    return L.marker(coords, {icon: icon});
}
