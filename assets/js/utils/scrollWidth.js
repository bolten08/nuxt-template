export function scrollbarWidth() {
    if (typeof document === 'undefined') return 0;

    const div = document.createElement('div');

    div.style.position = 'fixed';
    div.style.left = 0;
    div.style.visibility = 'hidden';
    div.style.overflowY = 'scroll';

    document.body.appendChild(div);
    const width = div.getBoundingClientRect().right;
    document.body.removeChild(div);

    return width;
}
