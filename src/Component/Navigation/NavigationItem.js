import React from 'react';

const navigationItem = props => {
    return (
        <div className='navigation__item' onClick={() => props.clicked(props.value)}>
            {props.name}
        </div>
    )
}

export default navigationItem;