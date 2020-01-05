import React from 'react';

import checked from '../../Assets/checked.png';
import toCheck from '../../Assets/toCheck.png';
import bin from '../../Assets/bin.png';
// import binHover from '../../Assets/binHover.png'; słaba jakość obrazka na stronie - czy opłaca się robić hover?

import './PurchaseItem.css';

const PurchaseItem = props => {
    const itemStyle = [
        'purchaseItem__container',
        props.purchased
            ? 'purchaseItem__container--purchased'
            : 'purchaseItem__container--toPurchase'
    ]

    let animationStyle = {
        transitionDelay: props.animationDelay + 's',
        transition: 'all .3s forwards',
        transform: 'translateY(-100%)',
        opacity: 0
    }

    if (props.startAnimation) {
        animationStyle.transform = 'translateY(0)';
        animationStyle.opacity = 1;
    }

    return (
        <div 
            style={{...animationStyle}}
            className={itemStyle.join(' ')}>
            {props.ingredient} -
            {Math.round(props.weight)} gram
            {
                props.purchased
                    ? <img
                        className='purchaseItem__img'
                        onClick={() => props.tooglePurchasedProperty(props.id)}
                        src={checked}
                        alt="purchased" />
                    : <img
                        className='purchaseItem__img'
                        onClick={() => props.tooglePurchasedProperty(props.id)}
                        src={toCheck}
                        alt="to purchase" />
            }
            <img
                className='purchaseItem__bin'
                onClick={() => props.removeFromPurchaseList(props.id)}
                src={bin}
                alt="to purchase" />
        </div>
    )
}

export default PurchaseItem;