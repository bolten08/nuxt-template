/* Has filter */
export function splitThousands(num, separator = ' ') {
    if (typeof num !== 'number' && !Number.isNaN(num)) {
        console.warn('[Utils/roundToMillions] Аргумент "num" должен быть Number: ', num);
        return '';
    }
    const tmp = num.toString().split('.');
    let value = tmp[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    if (Number(tmp[1])) {
        value += `.${tmp[1]}`;
    }
    return value;
}

/* Has filter */
export function roundToMillions(num, accuracy = 1) {
    if (typeof num !== 'number' && !Number.isNaN(num)) {
        console.warn('[Utils/roundToMillions] Аргумент "num" должен быть Number: ', num);
        return '';
    }
    if (typeof accuracy !== 'number' && !Number.isNaN(accuracy)) {
        console.warn('[Utils/roundToMillions] Аргумент "accuracy" должен быть Number: ', num);
        return '';
    }

    return (Number(num) / 1000000).toFixed(accuracy);
}

/* Has filter */
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

/* Has filter */
export function prettyPhone(rawPhoneNumber) {
    return rawPhoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
}

export function cleanPhone(prettyPhoneNumber) {
    return prettyPhoneNumber.replace(/ |-|\(|\)|_/g, '');
}

/* Has filter */
export function bytesToSize(bytes) {
    if (bytes === undefined || bytes === null) {
        console.warn('[bytesToSize] Wrong bytes ', bytes);
        return '';
    }
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) {
        return `${bytes} ${sizes[i]}`;
    }
    return `${((bytes / 1024) ** i).toFixed(1)} ${sizes[i]}`;
}

/* Has filter */
export function monthByNumber(num, type = 'full') {
    if (typeof num !== 'number' || isNaN(num) || num < 0 || num > 11) {
        console.warn('[monthByNumber] Wrong number ', num);
        return '';
    }
    const months = {
        0: {
            full: 'Январь',
            short: 'Янв',
            case: 'Января',
        },
        1: {
            full: 'Февраль',
            short: 'Фев',
            case: 'Февраля',
        },
        2: {
            full: 'Март',
            short: 'Мар',
            case: 'Марта',
        },
        3: {
            full: 'Апрель',
            short: 'Апр',
            case: 'Апреля',
        },
        4: {
            full: 'Май',
            short: 'Май',
            case: 'Мая',
        },
        5: {
            full: 'Июнь',
            short: 'Июн',
            case: 'Июня',
        },
        6: {
            full: 'Июль',
            short: 'Июл',
            case: 'Июля',
        },
        7: {
            full: 'Август',
            short: 'Авг',
            case: 'Августа',
        },
        8: {
            full: 'Сентябрь',
            short: 'Сен',
            case: 'Сентября',
        },
        9: {
            full: 'Октябрь',
            short: 'Окт',
            case: 'Октября',
        },
        10: {
            full: 'Ноябрь',
            short: 'Ноя',
            case: 'Ноября',
        },
        11: {
            full: 'Декабрь',
            short: 'Дек',
            case: 'Декабря',
        },
    };

    return months[num][type];
}

/* Has filter */
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

/* Has filter */
export function dateToString(date) {
    if (!date || !(date instanceof Date)) {
        console.log('[dateToString] Wrong date, ', date);
        return '';
    }

    const year = date.getFullYear();
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
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.trim().split(';');
    let value = '';
    ca.forEach(item => {
        const param = item.split('=');
        if (param[0].trim() === name) {
            value = param[1];
        }
    });
    return value;
}

export function chunkArray(arr, chunkSize) {
    const copy = arr.slice(0);
    const results = [];

    while (copy.length) {
        results.push(copy.splice(0, chunkSize));
    }

    return results;
}

export function formDataToObject(formData) {
    if (!formData || typeof formData !== 'object') {
        console.warn('[formDataToObject] wrong FormData');
        return {};
    }
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

export function getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
    };
}

// Not stable
export function truncText(el, t) {
    const text = t || el.textContent;
    const wordArray = text.split(' ');

    while (el.scrollHeight > el.clientHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
    }
}

export function isIe() {
    const ua = process.browser ? window?.navigator?.userAgent : '';
    const msie = ua.indexOf('MSIE ') > 0 || Boolean(ua.match(/Trident.*rv:11\./));

    return msie > 0;
}

export function lockBody() {
    document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
}

export function unlockBody() {
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}
