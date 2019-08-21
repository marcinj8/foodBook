import React from 'react';
import PurchaseItem from './PurchseItem';

const purchaseList = props => {
    const list = [];

    Object.keys(props.purchaseList).map(item => {
        return list.push(
            <div key={item}>
                <PurchaseItem
                    id={item}
                    ingredient={props.purchaseList[item].ingredient}
                    weight={props.purchaseList[item].weight}
                    purchased={props.purchaseList[item].purchased}
                    tooglePurchasedProperty={props.tooglePurchasedProperty}
                    removeFromPurchaseList={props.removeFromPurchaseList}
                />
            </div>
        )
    })

    return list
}

export default purchaseList;