import React from 'react';

import './Backdrop.css'

const backdrop = props => {
    if(!props.show) {
        return null
    }
    return (
        <div onClick={props.clicked} className='backdrop'>
        </div>
    )
}

export default backdrop;