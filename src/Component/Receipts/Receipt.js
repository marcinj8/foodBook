import React from 'react';

import './Receipt.css';

const receipt = props => {
    let healthLabels = 'no halth label';
    if(props.receipt.healthLabels) {
        healthLabels =['Health labels:']
        props.receipt.healthLabels.map(item => {
            return healthLabels.push(
                <span key={item}> #{item}</span>
            )
        }) 
    }
    return (
        <div className='recipe__block' onClick={props.clicked}>
            <h3>{props.receipt.label}</h3> 
            <img src={props.receipt.image} alt=""/>
            <div>
                {healthLabels}
            </div>
        </div>
    )
}

export default receipt;