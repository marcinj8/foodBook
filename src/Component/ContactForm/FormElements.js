import React from 'react';

import FormElement from './FormElement';


const formElements = props => {
    const elementes = [];
    props.formConfig.map(item => {
        return elementes.push(
            <FormElement
                key={item.id}
                htmlTag={item.htmlTag}
                class={item.className}
                type={item.type}
                validation={props.emailValidation[item.id]}
                placeholder={typeof (item.placeholder) !== 'object'
                    ? item.placeholder
                    : props.placeholders[item.id].placeholder.end}
                onChangeElement={props.onChangeElement}
                itemValue={props.values[item.id]}
                showMessage={props.showMessage}
            />
        )
    })

    return elementes
}

export default formElements;