import ResizeObserver from 'resize-observer-polyfill';

export function addResizeListener(element, fn) {
    if (typeof document === 'undefined') return;

    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new ResizeObserver(resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
}

export function removeResizeListener(element, fn) {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(
        element.__resizeListeners__.indexOf(fn),
        1
    );
    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
}

function resizeHandler(entries) {
    for (let entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach(fn => {
                fn();
            });
        }
    }
}
