import React from 'react';

import './Backdrop.css'

const backdrop = props => {
    if (!props.show) {
        return null
    }

    let backdropStyle = ['backdrop',
        props.onlyMobile
            ? 'onlyMobile'
            : null
]
    return (
        <div onClick={props.clicked} className={backdropStyle.join(' ')}>
        </div >
    )
}

export default backdrop;