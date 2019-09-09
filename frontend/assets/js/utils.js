export function splitThousands(number) {
    return number
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function roundToMillions(price, accuracy = 1) {
    if (price) {
        return (Number(price) / 1000000).toFixed(accuracy);
    } else {
        return 0;
    }
}

export function plural(number, postfixes) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return postfixes[2];
    }
    n %= 10;
    if (n === 1) {
        return postfixes[0];
    }
    if (n >= 2 && n <= 4) {
        return postfixes[1];
    }
    return postfixes[2];
}

export function getCookie(name) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.trim().split(';');
    let value = undefined;
    ca.forEach(item => {
        let param = item.split('=');
        if (param[0].trim() === name) {
            value = param[1];
        }
    });
    return value;
}

export function cleanPhone(value) {
    return value.replace(/ |-|\(|\)|_/g, '');
}

export function chunkArray(arr, chunkSize) {
    let copy = arr.slice(0);
    let results = [];

    while (copy.length) {
        results.push(copy.splice(0, chunkSize));
    }

    return results;
}

export function queryToObject(qs) {
    let obj = {};

    if (qs) {
        let params = qs.split('&');

        params.forEach(param => {
            let name = param.split('=')[0];
            let value = param.split('=')[1];
            if (name && value) {
                if (obj.hasOwnProperty(name)) {
                    if (Array.isArray(obj[name])) {
                        obj[name].push(value);
                    } else {
                        obj[name] = [obj[name], value];
                    }
                } else {
                    obj[name] = value;
                }
            }
        });
    }
    return obj;
}

export function objectToQuery(obj) {
    let qs = '';
    for (let name in obj) {
        if (obj[name]) {
            if (Array.isArray(obj[name])) {
                obj[name].forEach(val => {
                    if (val) {
                        qs += `${name}=${val}&`;
                    }
                });
            } else {
                qs += `${name}=${obj[name]}&`;
            }
        }
    }
    return qs.slice(0, -1);
}

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

export function getOffset(el) {
    let rect = el.getBoundingClientRect();

    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

export function bytesToSize(bytes) {
    if (!bytes && bytes === 0) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export function monthByNumber(num, isCase = false) {
    const months = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь'
    };

    const casedMonths = {
        0: 'Января',
        1: 'Февраля',
        2: 'Марта',
        3: 'Апреля',
        4: 'Мая',
        5: 'Июня',
        6: 'Июля',
        7: 'Августа',
        8: 'Сентября',
        9: 'Октября',
        10: 'Ноября',
        11: 'Декабря'
    };

    if (isCase) {
        return casedMonths[num];
    } else {
        return months[num];
    }
}

export function truncText(el, t) {
    let text = t || el.textContent;
    let wordArray = text.split(' ');

    while (el.scrollHeight > el.clientHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
    }
}

export function addMask(value, mask, tokens, keepMasked = true) {
    let iMask = 0;
    let iValue = 0;
    let output = '';
    while (iMask < mask.length && iValue < value.length) {
        let cMask = mask[iMask];
        let masker = tokens[cMask];
        let cValue = value[iValue];
        if (masker) {
            if (masker.pattern.test(cValue)) {
                output += masker.transform ? masker.transform(cValue) : cValue;
                iMask++;
            }
            iValue++;
        } else {
            if (masker) {
                iMask++;
                cMask = mask[iMask];
            }
            if (keepMasked) output += cMask;
            if (cValue === cMask) iValue++;
            iMask++;
        }
    }
    let restOutput = '';
    while (iMask < mask.length) {
        var cMask = mask[iMask];
        if (tokens[cMask]) {
            restOutput = '';
            break;
        }
        restOutput += cMask;
        iMask++;
    }

    return output;
}

export function setCursor(el, position) {
    if (el === document.activeElement) {
        el.setSelectionRange(position, position);
        setTimeout(() => {
            el.setSelectionRange(position, position);
        }, 0);
    }
}
