const isRequired = value => {
    return value.trim() !== '';
}

const isMinLenght = (value, minLength) => {
    return value.length >= minLength;
}

const checkIsIncluded = (value, requiredSign) => {
    return value.some(character => character === requiredSign);
}

const checkCharactersBeetwenSigns = (array, quantity) => {
    console.log(array)
    let isLongEnough = false;
    for (let index = 0; index <= array.length - 2; index++) {
        isLongEnough = array[index + 1] - array[index] >= quantity
        if (!isLongEnough) {
            return false
        }
    }
    return isLongEnough
}

const isIncluded = (value, requiredSigns) => {
    const stringToArr = [...value];
    let isSignsIncluded = false;
    let currentPositionInString = 0;
    const signsPositionsInArr = [0];
    let isLongEnough = false;

    for (const sign of requiredSigns) {
        const updatedArr = stringToArr.slice(currentPositionInString);
        isSignsIncluded = checkIsIncluded(updatedArr.slice(currentPositionInString), sign);
        currentPositionInString = updatedArr.findIndex(item => item === sign) + 1;
        signsPositionsInArr.push(currentPositionInString);
        console.log(updatedArr, currentPositionInString)
        if (!isSignsIncluded) {
            return isSignsIncluded;
        }
    }
    signsPositionsInArr.push(stringToArr.length);
    isLongEnough = checkCharactersBeetwenSigns(signsPositionsInArr, 2);
    if (!isLongEnough) {
        return isLongEnough
    }

    return isSignsIncluded;
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
            // case 'excludes':
            //     isConditionValid.push(isExncluded(currentValue, validationConditions[condition]));
            //     break;
            case 'includes':
                isConditionValid.push(isIncluded(currentValue, validationConditions[condition]));
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