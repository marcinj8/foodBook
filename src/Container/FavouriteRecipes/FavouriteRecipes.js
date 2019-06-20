import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReceiptsList from '../../Component/Receipts/ReceiptsList';

import './FavouriteRecipes.css'
import Modal from '../../Component/Modal/Modal';
import RecipeDetail from '../../Component/Receipts/RecipeDetail';

class FavouriteRecipes extends Component {
    state = {
        showModal: false,
        favouriteRecipeDetail: null
    }

    seeFavoriteRecipeDetailHandler = (recipeDetail, index) => {
        console.log(recipeDetail)
        this.setState({
            showModal: true,
            favouriteRecipeDetail: recipeDetail
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
        const favouritesRecipesList = [];
        if(this.props.favourites !== null) {
            Object.keys(this.props.favourites).map( key => favouritesRecipesList.push({...this.props.favourites[key], ID: key}))
        }
        console.log(this.state)
        return (
            <div className={StartPageStyle.join(' ')}>
                <h2>Favorite Recipes</h2>
                <div className='favouriteRecipes__recipeList'>
                    {
                        favouritesRecipesList.length > 0
                        ? <ReceiptsList 
                            seeReceiptDetail={this.seeFavoriteRecipeDetailHandler}
                            receiptList={favouritesRecipesList}/>
                        : <h3>Loading...</h3> 
                    }
                </div>
                <Modal
                    closeModal={this.closeModalHandler}
                    show={this.state.showModal}>
                    {
                        this.state.favouriteRecipeDetail !== null
                        ? <RecipeDetail 
                            ID={this.state.favouriteRecipeDetail.ID}
                            isBookmarked={this.state.favouriteRecipeDetail.bookmarked}
                            reciptDetail={this.state.favouriteRecipeDetail.recipe}/>
                        : null
                    }
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        favourites: state.favouritesRecipes,
    }
}

export default connect(mapStateToProps)(FavouriteRecipes);