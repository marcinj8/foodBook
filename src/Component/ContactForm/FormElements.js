import React from 'react';

import FormElement from './FormElement';


const formElements = props => {
    const elementes = [];
    props.formConfig.map((item, index) => {
        return elementes.push(
            <FormElement
                key={item.id}
                animationDelay={index * 0.2 + .5}
                htmlTag={item.htmlTag}
                class={item.className}
                type={item.type}
                validation={props.itemValidation[item.id]}
                placeholder={typeof (item.placeholder) !== 'object'
                    ? item.placeholder
                    : props.placeholders[item.id].placeholder.end}
                onChangeElement={props.onChangeElement}
                itemValue={props.values[item.id]}
                startAnimation={props.startAnimation}
            />
        )
    })

    return elementes
}

export default formElements;