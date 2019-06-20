import React from 'react';

import './NavigationItem.css'

const navigationItem = props => {
    let navigationItemStyle = ['navigation__item', 
        props.active
        ? 'navigation__item--active'
        : 'navigation__item--noActive' ];

    return (
        <div className={navigationItemStyle.join(' ')} onClick={() => props.clicked(props.value)}>
            {props.name}
        </div>
    )
}

export default navigationItem;