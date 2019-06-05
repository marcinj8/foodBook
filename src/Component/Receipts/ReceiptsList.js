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
                    receipt={item.recipe}
                    clicked={() => props.seeReceiptDetail(item.recipe)}/>
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