import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReceiptsList from '../../Component/Receipts/ReceiptsList';
import Modal from '../../Component/Modal/Modal';
import RecipeDetail from '../../Component/Receipts/RecipeDetail';
import * as AsyncFunc from '../../AsyncFunc/AsyncFunc';

import './FavouriteRecipes.css';

class FavouriteRecipes extends Component {
    state = {
        showModal: false,
        favouriteRecipeDetail: null
    }

    componentWillUpdate () {
        // pobierz i prześlij dane
        if(this.props.isActive){
            AsyncFunc.test();
            console.log('show')
        }
        if(!this.props.isActive) {
            console.log('hide')
        }
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
        let favouritesRecipesList = [];
        if(this.props.favourites !== null) {
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