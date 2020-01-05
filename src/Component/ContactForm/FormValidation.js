const isRequired = value => {
    return value.trim() !== '';
}

const isMinLenght = (value, minLength) => {
    return value.length >= minLength;
}

const checkSignPosition = (valueArr, sing) => {
    let signCounter = 0;
    let signPosition = 0;
    for (let value of valueArr) {
        if (value === sing) {
            signCounter++;
        }
    }
    if (signCounter !== 1) {
        return false
    }
    signPosition = valueArr.findIndex(val => val === sing);

    return signPosition;
}

const checkIsEmailValid = (value, ) => {
    const stringToArr = [...value];
    const excludedSignsArr = ["!", "#", "$", "%", "&", "'", "*", "+", "-", "/", "=", "?", "^", "_", "`", "{", "|", "}", "~", "(", ")", ",", ":", ";", "<", ">", "[", "]", '"'];
    let isEmailValid = false;
    let isLongEnough = false;

    const atPosition = checkSignPosition(stringToArr, '@');
    if (!atPosition) {
        return atPosition;
    }
    const dotPosition = checkSignPosition(stringToArr.slice(atPosition + 1), '.')
    if (!dotPosition) {
        return dotPosition;
    }
    isLongEnough = dotPosition + 1 + atPosition + 1;

    if (atPosition >= 1 && dotPosition >= 2 && stringToArr.slice(isLongEnough).length >= 2 && stringToArr.slice(isLongEnough).length < 4) {
        isEmailValid = true;
    }

    const emailExcludedSigns = isExncluded(value.slice(atPosition + 1), excludedSignsArr)
    if (!emailExcludedSigns) {
        return emailExcludedSigns;
    }

    return isEmailValid;
}

const isExncluded = (value, excludedSignsArr) => {
    for (let character of value) {
        for (let sign of excludedSignsArr) {
            if (character === sign) {
                return false
            }
        }
    }
    return true
}

const checkValidation = (value, validationConditions) => {
    const currentValue = value.trim();
    const conditions = Object.keys(validationConditions);
    let isValid = false;
    const isConditionValid = [];
    let validationMessage = '';

    for (let condition of conditions) {
        switch (condition) {
            case 'required':
                isConditionValid.push(isRequired(currentValue));
                break;
            case 'minLength':
                isConditionValid.push(isMinLenght(currentValue, validationConditions[condition]));
                break;
            case 'excludes':
                isConditionValid.push(isExncluded(currentValue, validationConditions[condition]));
                break;
            case 'email':
                isConditionValid.push(checkIsEmailValid(currentValue));
                break;
            default: break;
        }
    }

    for (let condition of isConditionValid) {
        if (condition) {
            isValid = true;
        }
        else {
            isValid = false;
            break;
        }
    }
    validationMessage = isValid
        ? 'OK'
        : validationConditions.message;

    return {
        isValid: isValid,
        message: validationMessage,
        showMessage: !isValid
    }
}

export default checkValidation;