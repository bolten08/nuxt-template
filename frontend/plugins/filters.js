import Vue from 'vue';

Vue.filter('splitThousands', function (number, separator = ' ') {
    if (!number) return '';
    let tmp = number.toString().split('.');
    let value = tmp[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    if (Number(tmp[1])) {
        value += `.${tmp[1]}`;
    }
    return value;
});

Vue.filter('roundToMillions', function (price, acc = 1) {
    if (price) {
        return +(Number(price) / 1000000).toFixed(acc);
    } else {
        return 0;
    }
});

Vue.filter('plural', function (number, postfixes) {
    if (!number) return '';
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
});


Vue.filter('prettyPhone', function (phone) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
});


Vue.filter('bytesToSize', function (bytes) {
    if (!bytes && bytes === 0) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
});

Vue.filter('monthByNumber', function (num, options = {}) {
    if (!num) return '';

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

    if (options.short) {
        return months[num].short;
    } else if (options.case) {
        return months[num].case;
    } else {
        return months[num].full;
    }
});
