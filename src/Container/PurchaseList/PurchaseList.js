import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';
import PurchaseListRender from '../../Component/PurchaseList/PurchaseList';
import Modal from '../../Component/Modal/Modal';
import FormElements from '../../Component/ContactForm/FormElements';

import formConfig from './formAddToPurchaseListConfig.json';

import './PurchaseList.css';

class PurchaseList extends Component {
    state = {
        isShowModalAddToPurchaseList: false,
        newItemData: {
            description: '',
            quantity: '',
            weight: ''
        },
        newItemValidation: null,

    }

    componentDidMount() {
        this.setNewItemState();
        this.props.onGetPurchaseList();
        this.setModalAddIngredientsData();
    }

    componentDidUpdate() {
        if (!this.props.isStateListUpdated) {
            this.props.onGetPurchaseList();
        }
        if (!this.props.isServerListUpdated) {
            this.props.onSendListOnServer(this.props.purchaseList);
        }
    }

    setNewItemState = () => {
        const newItemvalidationUpdated = {};
        for (let item of formConfig) {
            // placeholders[item.id] = {};
            newItemvalidationUpdated[item.id] = {};
            // placeholders[item.id].placeholder = {};
            // placeholders[item.id].placeholder.end = item.placeholder.end;
            newItemvalidationUpdated[item.id].isValid = false;
            newItemvalidationUpdated[item.id].message = '';
            newItemvalidationUpdated[item.id].showMessage = false;
        }

        this.setState({
            newItemValidation: newItemvalidationUpdated,
            // placeholders: placeholders
        })
        
    }

    setModalAddIngredientsData = () => {
        const newItemDataUpdated = {};
        formConfig.map( item => {
            return newItemDataUpdated[item.id] = ''
        })
       this.setState({
           newItemData: newItemDataUpdated
       })
    }

    onInputChange = e => {
        const newItemUpdatedData = this.state.newItemData;
        newItemUpdatedData[e.target.placeholder] =  e.target.value;
        // podpiąć walidację
        this.setState({
            newItemData: newItemUpdatedData
        })
    }

    showModalAddToPurchaseList = () => {
        this.setState({
            isShowModalAddToPurchaseList: true
        })
    }

    hideModalAddToPurchaseList = () => {
        this.setState({
            isShowModalAddToPurchaseList: false
        })
    }

    addToPurchaseListHandler = () => {
        const newItemName = this.state.newItemData.description;
        const newItemQuantity = this.state.newItemData.quantity;
        const newItemWeight = this.state.newItemData.weight;

        this.props.onAddToPurchaseList(newItemName, newItemQuantity, newItemWeight);
        this.hideModalAddToPurchaseList();
        this.setState({
            newItemData: {}
        })
    }

    render() {
        const purchaseListStyle = ['purchaseList__container',
            this.props.isActive
                ? 'purchaseList__container--active'
                : 'purchaseList__container--noActive'
        ];

        let purchaseList = (
            <div>
                Purchase list is empty
            </div>
        );
        if (this.props.purchaseList !== null && Object.keys(this.props.purchaseList).length > 0) {
            purchaseList = (
                <PurchaseListRender
                    purchaseList={this.props.purchaseList}
                    removeFromPurchaseList={this.props.onRemoveFromPurchaseList}
                    tooglePurchasedProperty={this.props.onTooglePurchasedProperty}
                />
            )
        }

        let modalAddToPurchaseList = !this.state.isShowModalAddToPurchaseList
            ? null
            : <Modal
                show={this.state.isShowModalAddToPurchaseList}
                closeModal={this.hideModalAddToPurchaseList}>
                <FormElements
                    itemValidation={this.state.newItemValidation}
                    values={this.state.newItemData}
                    formConfig={formConfig} 
                    onChangeElement={this.onInputChange}/>
                <button
                    className='purchaseList__button'
                    onClick={() => this.addToPurchaseListHandler()}
                    type="">Add</button>
            </Modal>;


        return (
            <div className={purchaseListStyle.join(' ')}>
                <h4 className='purchaseList__title'>Purchase List</h4>
                {purchaseList}
                {modalAddToPurchaseList}
                <button
                    className='purchaseList__button'
                    onClick={() => this.showModalAddToPurchaseList()}
                    type="">Add item</button>
                <button
                    className='purchaseList__button'
                    onClick={() => this.props.onRemoveMultipleItemsFromPurchaseList('purchased', this.props.purchaseList)}
                    type="">Clear Purchased</button>
                <button
                    className='purchaseList__button'
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
        onSendListOnServer: purchaseList => dispatch(actionsPurchaseList.sendListOnServer(purchaseList)),
        onAddToPurchaseList: (...args) => dispatch(actionsPurchaseList.addToPurchaseList(...args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseList);