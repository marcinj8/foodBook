import React, { Component } from 'react';

import './PurchaseList.css'

class PurchaseList extends Component {
    state = {}

    render() {

        const purchaseListStyle = ['purchaseList__container',
            this.props.isActive
            ? 'purchaseList__container--active'
            : 'purchaseList__container--noActive'
        ];
            
        return (
            <div className={purchaseListStyle.join(' ')}>
                <h4>Purchase List</h4>
                
            </div>
        )
    }
}

export default PurchaseList