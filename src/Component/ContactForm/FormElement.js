import React from 'react';

import './FormElement.css';

const formElement = props => {
    const message = props.validation.showMessage
        ? <div className='form__validatoinMessage'>{props.validation.message}</div>
        : null;

    const itemStyle = [
        props.class,
        props.validation.showMessage
            ? 'form__validationError'
            : props.validation.isValid
                ? 'form__validationSucces'
                : null
    ];

    switch (props.htmlTag) {
        case 'input':
            return (
                <div>
                    <input
                        className={itemStyle.join(' ')}
                        placeholder={props.placeholder}
                        onChange={props.onChangeElement}
                        type={props.type}
                        value={props.itemValue}
                        name="" />
                    {message}
                </div>
            );
        case 'textarea':
            return (
                <div>
                    <textarea
                        className={itemStyle.join(' ')}
                        placeholder={props.placeholder}
                        onChange={props.onChangeElement}
                        type="text"
                        value={props.itemValue}
                        name="" />
                    {message}
                </div>
            );
        default: return null
    }
}

export default formElement