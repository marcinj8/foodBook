import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReceiptsList from '../../Component/Receipts/ReceiptsList';
import Modal from '../../Component/Modal/Modal';
import RecipeDetail from '../../Component/Receipts/RecipeDetail';
import * as actions from '../../Store/Actions/actions';
import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';

import './FavouriteRecipes.css';

class FavouriteRecipes extends Component {
    state = {
        showModal: false,
        isLoadedNewList: false,
        favouriteRecipeDetail: null,
        favouriteRecipeID: null
    }

    componentDidUpdate() {
        if (this.props.isActive && !this.state.isLoadedNewList) {
            this.setFavouriteList();
            if (!this.props.isFavouriteRecipesUpdatedOnApp) {
                this.props.setFavourites();
                console.log('pobierz nową listę');
            }
        }
    }

    setLoadingToTrue = () => {
        this.setState({ isLoadedNewList: true })
    }

    setLoadingToFalse = () => {
        this.setState({ isLoadedNewList: false })
    }

    setFavouriteList = () => {
        this.props.setFavourites();
        this.setLoadingToTrue();

    }

    seeFavoriteRecipeDetailHandler = (recipeDetail, index) => {
        this.setState({
            showModal: true,
            favouriteRecipeDetail: recipeDetail,
            favouriteRecipeID: index
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false,
            favouriteRecipeDetail: null
        })
    }

    removeFromFavouritesHandler = (id) => {
        this.props.removeFromFavourites(id);
        this.closeModalHandler();
    }

    render() {
        const StartPageStyle = ['favouriteRecipes__container',
            this.props.isActive
                ? 'favouriteRecipes__container--active'
                : 'favouriteRecipes__container--noActive'
        ];
        let favouritesRecipesList = [];

        if (this.props.favourites !== null) {
            Object.keys(this.props.favourites).map((item) => {
                return favouritesRecipesList.push({ ...this.props.favourites[item], key: item })
            });
        }
        return (
            <div className={StartPageStyle.join(' ')}>
                <h2 className='favouriteRecipes__title'>Favorite Recipes</h2>
                <div className='favouriteRecipes__recipeList'>
                    {
                        favouritesRecipesList.length > 0
                            ? <ReceiptsList
                                seeReceiptDetail={this.seeFavoriteRecipeDetailHandler}
                                receiptList={favouritesRecipesList} />
                            : !this.props.isFavouriteRecipesUpdatedOnApp
                                ? <h3>Loading...</h3>
                                : <h3 className='favouriteRecipes__emptyList'>List is empty!</h3>
                    }
                </div>
                <Modal
                    closeModal={this.closeModalHandler}
                    show={this.state.showModal}>
                    {
                        this.state.favouriteRecipeDetail !== null
                            ? <RecipeDetail
                                isFavouriteList={true}
                                addToPurchaseList={(...args) => this.props.addToPurchaseList(this.props.itemsToPurchase, ...args)}
                                removeFromFavourite={(id) => this.removeFromFavouritesHandler(id)}
                                ID={this.state.favouriteRecipeDetail.key}
                                isBookmarked={this.state.favouriteRecipeDetail.bookmarked}
                                reciptDetail={this.state.favouriteRecipeDetail.recipe} />
                            : null
                    }
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        favourites: state.recipesReducer.favouritesRecipes,
        dataBaseKey: state.recipesReducer.dataBaseKey,
        itemsToPurchase: state.purchaseListReducer.purchaseList,
        isFavouriteRecipesUpdatedOnApp: state.recipesReducer.isFavouriteRecipesUpdatedOnApp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFavourites: () => dispatch(actions.setFavourites()),
        removeFromFavourites: (id, recipes) => dispatch(actions.removeFromFavourities(id, recipes)),
        addToPurchaseList: (...args) => dispatch(actionsPurchaseList.addToPurchaseList(...args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);