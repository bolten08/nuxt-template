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
