import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';

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
                <button 
                    onClick={ () => this.props.removeFromPurchaseList('data from click')}
                    type="">Clear Purchased</button>
                <button type="">Clear All</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        purchaseList: state.purchaseListReducer.purchaseList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromPurchaseList : data => dispatch(actionsPurchaseList.removeFromPurchaseList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseList);