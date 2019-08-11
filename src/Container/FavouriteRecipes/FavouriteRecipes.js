import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import ReceiptsList from '../../Component/Receipts/ReceiptsList';
import Modal from '../../Component/Modal/Modal';
import RecipeDetail from '../../Component/Receipts/RecipeDetail';
import * as actions from '../../Store/Actions/actions';
import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';

import './FavouriteRecipes.css';

const CORS = 'https://cors-anywhere.herokuapp.com/';

class FavouriteRecipes extends Component {
    state = {
        showModal: false,
        isLoadedNewList: false,
        favouriteRecipeDetail: null,
        favouriteRecipeID: null
    }

    componentDidUpdate() { // dodac odświażanie po akcji na bazie danych
        if (this.props.isActive && !this.state.isLoadedNewList) {
            this.setFavouriteList();
        }
        if (!this.props.isActive && this.state.isLoadedNewList) {
            console.log(this.props.isActive, 'hide');
            // saveFavouriteList();
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
        this.setLoadingToTrue(); // should work async (use redux to menage?)

    }

    saveFavouriteList = list => {
        Axios.put(CORS + 'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json', list)
            .then(res => {
                console.log(res);
                this.setLoadingToFalse();
            })
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

    render() {
        const StartPageStyle = ['favouriteRecipes__container',
            this.props.isActive
                ? 'favouriteRecipes__container--active'
                : 'favouriteRecipes__container--noActive'
        ];
        let favouritesRecipesList = [];

        if (this.props.favourites !== null) {
            favouritesRecipesList = this.props.favourites;
        }

        return (
            <div className={StartPageStyle.join(' ')}>
                <h2>Favorite Recipes</h2>
                <div className='favouriteRecipes__recipeList'>
                    {
                        favouritesRecipesList.length > 0
                            ? <ReceiptsList
                                seeReceiptDetail={this.seeFavoriteRecipeDetailHandler}
                                receiptList={favouritesRecipesList} />
                            : <h3>Loading...</h3>
                    }
                </div>
                <Modal
                    closeModal={this.closeModalHandler}
                    show={this.state.showModal}>
                    {
                        this.state.favouriteRecipeDetail !== null
                            ? <RecipeDetail
                                addToPurchaseList={this.props.addToPurchaseList}
                                removeFromFavourite={(id) => this.props.removeFromFavourites(id, this.props.favourites)}
                                ID={this.state.favouriteRecipeID}
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
        dataBaseKey: state.recipesReducer.dataBaseKey
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