import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
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

    componentDidUpdate () {
        if(this.props.apiKey !== null && this.props.apiId !== null && this.props.ingredient !== '' && this.props.receiptList.length === 0 && this.state.loading === false) {
            this.getReceipts();
        };
        if(this.props.receiptList.length > 0 && this.state.loading === true) {
            this.setLoadingToFalse()
        }
    };
    
    setReceips = response => {
        this.props.setReceips(response.data)
    }

    setLoadingToFalse = () => {
        this.setState({loading: false})
    }

    setLoadingToTrue = () => {
        this.setState({loading: true})
    }

    getReceipts = () => {
        this.setLoadingToTrue();
        this.props.setReceips(this.props.ingredient, this.props.apiId, this.props.apiKey, this.state.currentSearching.searchFrom, this.state.currentSearching.searchTo);
    }

    addedFavouriteList = recipe => {
        const updateFavouriteList = [...this.props.favouritesRecipes];
        console.log(updateFavouriteList)
        const recipeData = {...recipe};
        recipeData.bookmarked = true;
        updateFavouriteList.push(recipeData);
        return updateFavouriteList
    }

    addToFavouritesHandler = recipe => {
        const favouriteList = this.addedFavouriteList(recipe);
        this.props.onAddToFavourites(favouriteList);
    }

    removedFromFavouriteList = id => {
        const currentFavouriteList =[...this.props.favouritesRecipes];
        const updateFavouriteList = currentFavouriteList.filter( (el, i) => {
            console.log(i, id)
            return (i !== id)
        })
        return updateFavouriteList;
    }

    removeFromFavouritiesHandler = id => {
        console.log(this.props.favouritesRecipes)
        const favouriteList = this.removedFromFavouriteList(id);
        console.log(favouriteList)
        // this.props.updateFavouriteList(favouriteList);
    }

    render() {
        const searchRcipeStyle = ['searchRcipe__container',
            this.props.isActive
            ? 'searchRcipe__container--active'
            : 'searchRcipe__container--noActive'
        ];

        return(
            <div className={searchRcipeStyle.join(' ')}>
                <div className='searchRcipe__recipeList'>
                    {this.props.receipts !== null
                        ? <ReceiptList 
                            receiptList={this.props.receiptList} 
                            activeRecipe={this.props.activeRecipe}
                            seeReceiptDetail={this.props.seeReciptDetail}/>
                        : <div>Loading...</div>
                    }
                </div>
                <div className='searchRcipe__recipeDetails'>
                    {this.props.reciptDetail !== null
                        ? <ReciptDetail 
                            removeFromFavourite={this.removeFromFavouritiesHandler}
                            ID={this.props.reciptDetail.ID}
                            isBookmarked={this.props.reciptDetail.bookmarked}
                            addToFavourites={() => this.addToFavouritesHandler(this.props.reciptDetail)}
                            reciptDetail={this.props.reciptDetail.recipe}/>
                        : <h4>Choose recipe</h4>
                    }
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        apiKey: state.access.apiKey,
        apiId: state.access.apiId,
        receiptList: state.receipts,
        reciptDetail: state.reciptDetail,
        activeRecipe: state.activeRecipe,
        favouritesRecipes: state.favouritesRecipes,
        dataBaseKey: state.dataBaseKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReceips: (...arg) => dispatch(actions.setReceipts(...arg)),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: (details, index) => dispatch(actions.seeReciptDetail(details, index)),
        onAddToFavourites: (recipes) => dispatch(actions.pushUpdatedFavouriteList(recipes)),
        removeFromFavourites: (recipes) => dispatch(actions.pushUpdatedFavouriteList(recipes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);