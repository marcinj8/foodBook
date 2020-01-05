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

    let animationStyle = {
        transitionDelay: props.animationDelay + 's',
        transition: 'all .5s forwards',
        transform: 'scale(0)',
        opacity: 0
    }

    if (props.startAnimation) {
        animationStyle.transform = 'scale(1)';
        animationStyle.opacity = 1;
    }

    switch (props.htmlTag) {
        case 'input':
            return (
                <div>
                    <input
                        style={{ ...animationStyle }}
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
                        style={{ ...animationStyle }}
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