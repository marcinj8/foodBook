import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import ReceiptsList from '../../Component/Receipts/ReceiptsList';
import Modal from '../../Component/Modal/Modal';
import RecipeDetail from '../../Component/Receipts/RecipeDetail';
import * as actions from '../../Store/Actions/actions';

import './FavouriteRecipes.css';

const CORS = 'https://cors-anywhere.herokuapp.com/';

class FavouriteRecipes extends Component {
    state = {
        showModal: false,
        isLoadedNewList: false,
        favouriteRecipeDetail: null,
        favouriteRecipeID: null
    }

    componentDidUpdate () {
        if(this.props.isActive && !this.state.isLoadedNewList){
            this.setFavouriteList();
        }
        if(!this.props.isActive && this.state.isLoadedNewList) {
            console.log(this.props.isActive,'hide');
            // saveFavouriteList();
        }
    }

    setLoadingToTrue = () => {
        this.setState({isLoadedNewList: true})
    }

    setLoadingToFalse = () => {
        this.setState({isLoadedNewList: false})
    }
    
    setFavouriteList = () => {
        Axios.get(CORS+'https://fooddatabase-75cfa.firebaseio.com/favouritesList.json')
        .then(res => {
            this.setLoadingToTrue();
            let response = [];
            let dataBaseKey = '';
            for(let key in res.data) {
                response = res.data[key];
                dataBaseKey = key;
            }
            this.props.setFavourites(response, dataBaseKey)
        })
    }

    saveFavouriteList = list => {
        Axios.put(CORS+'https://fooddatabase-75cfa.firebaseio.com/favouritesList/'+this.props.dataBaseKey+'.json', list)
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
        if(this.props.favourites !== null) {
            favouritesRecipesList = this.props.favourites;
        }
        console.log(this.props.favourites, this.state.favouriteRecipeDetail)
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
                            removeFromFavourite={this.props.removeFromFavourites}
                            ID={this.state.favouriteRecipeID}
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
        dataBaseKey: state.dataBaseKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFavourites: (recipes, key) => dispatch(actions.setFavourites(recipes, key)),
        removeFromFavourites: id => dispatch(actions.removeFromFavourite(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);