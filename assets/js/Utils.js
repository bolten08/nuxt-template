export class Utils {
    static splitThousands(number) {
        if (!number) return '';
        return number.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    static plural(number, postfixes) {
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

    static getCookie(name) {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.trim().split(';');
        let value = false;
        ca.forEach(item => {
            let param = item.split('=');
            if (param[0].trim() === name) {
                value = param[1];
            }
        });
        return value;
    }

    static cleanPhone(value) {
        return value.replace(/ |-|\(|\)|_/g, '');
    }

    static chunkArray(arr, chunk_size) {
        let copy = arr.slice(0);
        let results = [];

        while (copy.length) {
            results.push(copy.splice(0, chunk_size));
        }

        return results;
    }

    static monthNameByNumber(num, plural = false) {
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

        const pluralMonths = {
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

        if (plural) {
            return pluralMonths[num];
        } else {
            return months[num];
        }
    }

    static queryParse() {
        let parsedParams = {};
        let queryString = window.location.search.substring(1);

        if (queryString) {
            let params = queryString.split('&');

            params.forEach(param => {
                let name = param.split('=')[0];
                let value = param.split('=')[1];

                if (value) {
                    if (name.match(/(_min|_max)$/)) {
                        name = name.slice(0, -4);
                    }
                    if (!parsedParams.hasOwnProperty(name)) {
                        parsedParams[name] = [];
                    }
                    value.split(',').forEach(val => {
                        parsedParams[name].push(val);
                    });
                }
            });
        }
        return parsedParams;
    }

    static queryStringify(obj) {
        let stringifiedParams = '';
        for (let name in obj) {
            if (obj[name]) {
                if (Array.isArray(obj[name]) && obj[name].length) {
                    stringifiedParams += `${name}=`;
                    obj[name].forEach(val => stringifiedParams += `${val},`);
                    stringifiedParams = stringifiedParams.slice(0, -1) + '&';
                } else if (typeof obj[name] === 'string' && obj[name].length) {
                    stringifiedParams += `${name}=${obj[name]}&`;
                } else {
                    console.warn('Unsupported parametr\'s type', obj[name]);
                }
            }
        }
        return stringifiedParams.slice(0, -1);
    }

    static getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    static getOffset(el) {
        let rect = el.getBoundingClientRect();

        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    }

    static roundToMillion(price, acc = 1) {
        if (price) {
            return (Number(price) / 1000000).toFixed(acc);
        } else {
            return 0;
        }
    }
}
