import React from 'react';

import FormElement from './FormElement';

import FormConfig from '../../Container/ContactForm/formConfig.json';

const formElements = props => {
    const elementes = [];
    
    FormConfig.map(item => {
        return elementes.push(
            <FormElement
                key={item.id}
                htmlTag={item.htmlTag}
                class={item.className}
                placeholder={props.placeholders[item.id].placeholder.end}
                onChangeElement={props.onInputChange}
                value={props.values[item.id]}
            />
        )
    })

    return elementes
}

export default formElements;