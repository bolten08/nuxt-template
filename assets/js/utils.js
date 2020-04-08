export function splitThousands(num, separator = ' ') {
    if (num === undefined || num === null) {
        console.warn('[splitThousands] Wrong Number ', num);
        return '';
    }
    let tmp = num.toString().split('.');
    let value = tmp[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    if (Number(tmp[1])) {
        value += `.${tmp[1]}`;
    }
    return value;
}

export function roundToMillions(num, accuracy = 1) {
    if (num === undefined || num === null) {
        console.warn('[roundToMillions] Wrong Number ', num);
        return '';
    }

    return (Number(num) / 1000000).toFixed(accuracy);
}

export function plural(num, postfixes) {
    if (!num) {
        console.warn('[plural] Wrong Number ', num);
        return '';   
    }

    let n = Math.abs(num);
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

export function prettyPhone(rawPhoneNumber) {
    return rawPhoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
}

export function cleanPhone(prettyPhoneNumber) {
    return prettyPhoneNumber.replace(/ |-|\(|\)|_/g, '');
}

export function bytesToSize(bytes) {
    if (!bytes) {
        console.warn('[bytesToSize] Wrong bytes ', bytes);
        return '';
    }
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export function monthByNumber(num, type = 'full') {
    if (typeof num !== 'number' || isNaN(num) || num < 0 || num > 11) {
        console.warn('[monthByNumber] Wrong number ', num);
        return '';
    }
    const months = {
        0: {
            full: 'Январь',
            short: 'Янв',
            case: 'Января'
        },
        1: {
            full: 'Февраль',
            short: 'Фев',
            case: 'Февраля'
        },
        2: {
            full: 'Март',
            short: 'Мар',
            case: 'Марта'
        },
        3: {
            full: 'Апрель',
            short: 'Апр',
            case: 'Апреля'
        },
        4: {
            full: 'Май',
            short: 'Май',
            case: 'Мая'
        },
        5: {
            full: 'Июнь',
            short: 'Июн',
            case: 'Июня'
        },
        6: {
            full: 'Июль',
            short: 'Июл',
            case: 'Июля'
        },
        7: {
            full: 'Август',
            short: 'Авг',
            case: 'Августа'
        },
        8: {
            full: 'Сентябрь',
            short: 'Сен',
            case: 'Сентября'
        },
        9: {
            full: 'Октябрь',
            short: 'Окт',
            case: 'Октября'
        },
        10: {
            full: 'Ноябрь',
            short: 'Ноя',
            case: 'Ноября'
        },
        11: {
            full: 'Декабрь',
            short: 'Дек',
            case: 'Декабря'
        }
    };
    
    return months[num][type];
}


export function dayByNumber(num, type = 'full') {
    if (num > 6) {
        console.warn('[dayByNumber] Wrong number,', num);
        return '';
    }

    const days = {
        0: {
            full: 'Воскресенье',
            short: 'вс',
        },
        1: {
            full: 'Понедельник',
            short: 'пн',
        },
        2: {
            full: 'Вторник',
            short: 'вт',
        },
        3: {
            full: 'Среда',
            short: 'ср',
        },
        4: {
            full: 'Четверг',
            short: 'чт',
        },
        5: {
            full: 'Пятница',
            short: 'пт',
        },
        6: {
            full: 'Суббота',
            short: 'сб',
        },
    };

    return days[num][type];
}

export function dateToString(date) {
    if (!date || !(date instanceof Date)) {
        console.log('[dateToString] Wrong date, ', date);
        return '';
    }

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month.toString().length < 2) {
        month = '0' + month;
    }
    if (day.toString().length < 2) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
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
                if (Object.prototype.hasOwnProperty.call(obj, name)) {
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

export function getOffset(el) {
    let rect = el.getBoundingClientRect();

    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

export function truncText(el, t) {
    let text = t || el.textContent;
    let wordArray = text.split(' ');

    while (el.scrollHeight > el.clientHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
    }
}

export function isIe() {
    let ua = process.browser ? window?.navigator?.userAgent : '';
    let msie = ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv:11\./);

    return msie > 0;
}
