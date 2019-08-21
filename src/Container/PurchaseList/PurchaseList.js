import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';

import PurchaseListRender from '../../Component/PurchaseList/PurchaseList';

import './PurchaseList.css';

class PurchaseList extends Component {
    state = {}

    componentDidUpdate() {
        if (!this.props.isStateListUpdated) {
            this.props.onGetPurchaseList();
        }
        if (!this.props.isServerListUpdated) {
            this.props.onSendListOnServer(this.props.purchaseList);
        }
    }

    render() {
        const purchaseListStyle = ['purchaseList__container',
            this.props.isActive
                ? 'purchaseList__container--active'
                : 'purchaseList__container--noActive'
        ];

        let purchaseList = 'Purchase list is empty'
        if(this.props.purchaseList !== null && Object.keys(this.props.purchaseList).length > 0) {
            purchaseList = (
            <PurchaseListRender 
                purchaseList={this.props.purchaseList}
                removeFromPurchaseList={this.props.onRemoveFromPurchaseList}
                tooglePurchasedProperty={this.props.onTooglePurchasedProperty}
            />
            )
        }

        return (
            <div className={purchaseListStyle.join(' ')}>
                <h4>Purchase List</h4>
                {purchaseList}
                <button
                    onClick={() => this.props.onRemoveMultipleItemsFromPurchaseList('purchased', this.props.purchaseList)}
                    type="">Clear Purchased</button>
                <button 
                    onClick={() => this.props.onRemoveMultipleItemsFromPurchaseList('all')}
                    type="">Clear All</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        purchaseList: state.purchaseListReducer.purchaseList,
        isStateListUpdated: state.purchaseListReducer.isStateListUpdated,
        isServerListUpdated: state.purchaseListReducer.isServerListUpdated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPurchaseList: () => dispatch(actionsPurchaseList.getPurchaseList()),
        onRemoveFromPurchaseList: id => dispatch(actionsPurchaseList.removeFromPurchaseList(id)),
        onRemoveMultipleItemsFromPurchaseList: (command, purchaseList) => dispatch(actionsPurchaseList.removeMultipleItemsFromPurchaseList(command, purchaseList)),
        onTooglePurchasedProperty: id => dispatch(actionsPurchaseList.tooglePurchasedProperty(id)),
        onSendListOnServer: purchaseList => dispatch(actionsPurchaseList.sendListOnServer(purchaseList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseList);