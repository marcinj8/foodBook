import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';
import ReceiptList from '../../Component/Receipts/ReceiptsList';
import ReciptDetail from '../../Component/Receipts/RecipeDetail';

import './SearchReceipt.css';

class SearchReceipt extends Component {
    state = {
        currentSearching: {
            ingredient: '',
            searchFrom: 0,
            searchTo: 10
        },
        loading: false,
        error: {
            occurred: false,
            message: null
        },
    };

    componentDidUpdate() {
        if (this.props.apiKey !== null && this.props.apiId !== null && this.state.loading === false) {
            if (this.props.ingredient !== this.state.currentSearching.ingredient && this.props.ingredient !== '') {
                this.getReceipts();
            }
        };
        if (this.props.receiptList.length > 0 && this.state.loading === true) {
            this.setLoadingToFalse()
        }
    };

    setReceips = response => {
        this.props.setReceips(response.data)
    }

    setLoadingToFalse = () => {
        this.setState({ loading: false })
    }

    setLoadingToTrue = () => {
        this.setState({ loading: true })
    }

    updateCurrentSearching = () => {
        const updateState = { ...this.state.currentSearching };
        updateState.ingredient = this.props.ingredient;

        this.setState({
            currentSearching: updateState
        })
    }

    getReceipts = () => {
        this.setLoadingToTrue();
        this.props.setReceips(this.props.ingredient, this.props.apiId, this.props.apiKey, this.state.currentSearching.searchFrom, this.state.currentSearching.searchTo);
        this.updateCurrentSearching();
    }

    addedFavouriteList = recipe => {
        const updateFavouriteList = [...this.props.favouritesRecipes];
        const recipeData = { ...recipe };
        recipeData.bookmarked = true;
        updateFavouriteList.push(recipeData);
        return updateFavouriteList
    }

    addToFavouritesHandler = recipe => {
        const favouriteList = this.addedFavouriteList(recipe);
        this.props.onAddToFavourites(favouriteList);
    }

    render() {
        const searchRcipeStyle = ['searchRcipe__container',
            this.props.isActive
                ? 'searchRcipe__container--active'
                : 'searchRcipe__container--noActive'
        ];

        return (
            <div className={searchRcipeStyle.join(' ')}>
                <div className='searchRcipe__recipeList'>
                    {this.props.receipts !== null
                        ? <ReceiptList
                            receiptList={this.props.receiptList}
                            activeRecipe={this.props.activeRecipe}
                            seeReceiptDetail={this.props.seeReciptDetail} />
                        : <div>Loading...</div>
                    }
                </div>
                <div className='searchRcipe__recipeDetails'>
                    {this.props.reciptDetail !== null
                        ? <ReciptDetail
                            addToPurchaseList={(...args) => this.props.addToPurchaseList(this.props.itemsToPurchase, ...args)}
                            addToFavourites={() => this.addToFavouritesHandler(this.props.reciptDetail)}
                            removeFromFavourite={(id) => this.props.removeFromFavourites(id, this.props.favouritesRecipes)}
                            ID={this.props.reciptDetail.ID}
                            isBookmarked={this.props.reciptDetail.bookmarked}
                            reciptDetail={this.props.reciptDetail.recipe} />
                        : <div style={{ 'marginTop': '50px' }}>
                            <h4>Choose recipe</h4>
                        </div>
                    }
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        apiKey: state.recipesReducer.access.apiKey,
        apiId: state.recipesReducer.access.apiId,
        receiptList: state.recipesReducer.receipts,
        reciptDetail: state.recipesReducer.reciptDetail,
        activeRecipe: state.recipesReducer.activeRecipe,
        favouritesRecipes: state.recipesReducer.favouritesRecipes,
        dataBaseKey: state.recipesReducer.dataBaseKey,
        itemsToPurchase: state.purchaseListReducer.purchaseList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReceips: (...arg) => dispatch(actions.setReceipts(...arg)),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: (details, index) => dispatch(actions.seeReciptDetail(details, index)),
        onAddToFavourites: (recipes) => dispatch(actions.pushUpdatedFavouriteList(recipes)),
        removeFromFavourites: (id, recipes) => dispatch(actions.removeFromFavourities(id, recipes)),
        addToPurchaseList: (...args) => dispatch(actionsPurchaseList.addToPurchaseList( ...args))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);