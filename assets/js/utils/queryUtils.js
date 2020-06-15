export function applyQuery(defaulValues, queryValues) {
    let values = {...defaulValues};


    if (typeof defaulValues !== 'object') {
        console.warn('defaulValues must be an object');
        return;
    }
    if (typeof queryValues !== 'object') {
        console.warn('queryValues must be an object');
        return;
    }
    if (!Object.keys(queryValues).length) {
        return values;
    }

    for (let name in queryValues) {
        if (Object.prototype.hasOwnProperty.call(values, name)) {
            if (Array.isArray(values[name])) {
                if (Array.isArray(queryValues[name])) {
                    values[name] = queryValues[name].map(i => {
                        if (i === 'true') {
                            return true;
                        } else if (i === 'false') {
                            return false;
                        } else return i;
                    });
                } else {
                    values[name] = [queryValues[name] === 'true' ? true : queryValues[name] === 'false' ? false : queryValues[name]];
                }
            } else {
                if (Array.isArray(queryValues[name])) {
                    values[name] = queryValues[name][0] === 'true' ? true : queryValues[name][0] === 'false' ? false : queryValues[name][0];
                } else {
                    values[name] = queryValues[name] === 'true' ? true : queryValues[name] === 'false' ? false : queryValues[name];
                }
            }
        }
    }

    // console.log('applyQuery result__', values);

    return values;
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
