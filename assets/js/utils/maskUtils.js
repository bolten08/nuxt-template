const tokens = {
    '#': {pattern: /\d/},
    S: {pattern: /[a-zA-Z]/},
    A: {pattern: /[0-9a-zA-Z]/},
    U: {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
    L: {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
};

export function addMask(value, mask, keepMasked = true) {
    let iMask = 0;
    let iValue = 0;
    let output = '';
    while (iMask < mask.length && iValue < value.length) {
        let cMask = mask[iMask];
        const masker = tokens[cMask];
        const cValue = value[iValue];
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
            if (keepMasked) {
                output += cMask;
            }
            if (cValue === cMask) {
                iValue++;
            }
            iMask++;
        }
    }

    // let restOutput = '';
    // while (iMask < mask.length) {
    //     const cMask = mask[iMask];
    //     if (tokens[cMask]) {
    //         restOutput = '';
    //         break;
    //     }
    //     restOutput += cMask;
    //     iMask++;
    // }

    return output;
}

export function splitThousands(value) {
    if (typeof value !== 'number' && typeof value !== 'string') {
        console.warn('[maskUtils] splitThousands / Неверные тип у "value"');
        return '';
    }
    const decimalMark = '.';
    const decimalCount = 2;
    const positiveOnly = false;

    let partDecimal = '';
    let parts;

    // strip alphabet letters
    value = value.toString();
    value = value
        .replace(/[A-Za-z]/g, '')
        // replace the first decimal mark with reserved placeholder
        .replace(decimalMark, 'M')

        // strip non numeric letters except minus and "M"
        // this is to ensure prefix has been stripped
        .replace(/[^\dM-]/g, '')

        // replace the leading minus with reserved placeholder
        .replace(/^-/, 'N')

        // strip the other minus sign (if present)
        .replace(/-/g, '')

        // replace the minus sign (if present)
        .replace('N', positiveOnly ? '' : '-')

        // replace decimal mark
        .replace('M', decimalMark);

    // strip any leading zeros
    // if (owner.stripLeadingZeroes) {
    // value = value.replace(/^(-)?0+(?=\d)/, '$1');
    // }

    const partSign = value.slice(0, 1) === '-' ? '-' : '';
    const partSignAndPrefix = partSign;
    let partInteger = value;

    if (value.indexOf(decimalMark) >= 0) {
        parts = value.split(decimalMark);
        partInteger = parts[0];
        partDecimal = decimalMark + parts[1].slice(0, decimalCount);
    }
    if (partSign === '-') {
        partInteger = partInteger.slice(1);
    }
    partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    return (
        partSignAndPrefix +
        partInteger.toString() +
        (decimalCount > 0 ? partDecimal.toString() : '')
    );
}

export function getNextCursorPosition(prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    return oldValue.length === prevPos
        ? newValue.length
        : prevPos + getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
}

function getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters) {
    const oldRawValue = stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
    const newRawValue = stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
    const lengthOffset = oldRawValue.length - newRawValue.length;

    return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
}

function stripDelimiters(value, delimiter) {
    // single delimiter
    // if (delimiters.length === 0) {
    let delimiterRE = delimiter
        ? new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g')
        : '';

    return value.replace(delimiterRE, '');
    // }

    // multiple delimiters Добавить третим аргументов delimeters
    // delimiters.forEach(function (current) {
    //     current.split('').forEach(function (letter) {
    //         value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
    //     });
    // });
    // return value;
}

export function setSelection(element, position) {
    if (element === document.activeElement) {
        if (element && element.value.length <= position) {
            return;
        }

        if (element.createTextRange) {
            let range = element.createTextRange();
            range.move('character', position);
            range.select();
        } else {
            try {
                element.setSelectionRange(position, position);
            } catch (e) {
                console.warn('The input element type does not support selection');
            }
        }
    }
}

// export function getRawNumber(value) {
//     return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
// }
