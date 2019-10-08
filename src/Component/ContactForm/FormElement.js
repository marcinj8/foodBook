import React from 'react';

const formElement = props => {
console.log(props)
    const message = props.showMessage
        ? <div>{props.message}</div>
        : null;

    switch (props.htmlTag) {
        case 'input':
            return (
                <div>
                    <input
                        className={props.class}
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
                        className={props.class}
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