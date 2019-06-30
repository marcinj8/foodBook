import React from 'react';
import Receipt from './Receipt';

import './ReceiptsList.css';

const receiptsList = props => {
    const receipts = [];
    if(props.receiptList !== null) {
        props.receiptList.map((item, index) => {
            return receipts.push(
                <Receipt 
                    key={index}
                    id={index}
                    receipt={item.recipe}
                    activeRecipe={props.activeRecipe === index}
                    active={''}
                    clicked={() => props.seeReceiptDetail(item, index)}/>
            )
        })
    }

    return (
        <div>
            {receipts}
        </div>
    )
}

export default receiptsList;