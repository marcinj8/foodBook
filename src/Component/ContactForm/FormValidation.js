const isRequired = value => {
    return value.trim() !== '';
}

const isMinLenght = (value, minLength) => {
    return value.length >= minLength;
}

const isIncluded = (value, requiredSigns) => {
    // console.log(value, requiredSigns);
    return true;
}

const checkValidation = (value, validationConditions) => {
    const conditions = Object.keys(validationConditions);
    let isValid = false;
    const isConditionValid = [];
    let validationMessage = '';

    for (let condition of conditions) {
        switch (condition) {
            case 'required':
                isConditionValid.push(isRequired(value));
                break;
            case 'minLength':
                isConditionValid.push(isMinLenght(value, validationConditions[condition]));
                break;
            case 'includes':
                isConditionValid.push(isIncluded(value, validationConditions[condition]));
                break;
            default: break;
        }
    }

    for (let condition of isConditionValid) {
        console.log(condition)
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