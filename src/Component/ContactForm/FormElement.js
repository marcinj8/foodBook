import React from 'react';

const formElement = props => {

    switch (props.htmlTag) {
        case 'input':
            return (
                <input 
                    className={props.class}
                    placeholder={props.placeholder}
                    onChange={props.onChangeElement}
                    type="text"
                    value={props.value}
                    name="" />
            );
        case 'textarea':
            return (
                <textarea 
                    className={props.class}
                    placeholder={props.placeholder}
                    onChange={props.onChangeElement}
                    type="text"
                    value={props.value}
                    name="" />
            );
        default: return null
    }
}

export default formElement