import React, { Component } from 'react';
import Axios from 'axios';
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
        this.setLoadingToTrue()
        Axios.get(`https://api.edamam.com/search?q=${this.props.ingredient}&app_id=${this.props.apiId}&app_key=${this.props.apiKey}&from=${this.state.currentSearching.searchFrom}&to=${this.state.currentSearching.searchTo}`)
        .then(res => this.setReceips(res))
        .catch(err => this.props.errorHandler(err))
    }

    addToFavouritesHandler = recipe => {
        const updateFavouriteList = [...this.props.favouritesRecipes];
        const recipeData = {...recipe};
        recipeData.bookmarked = true;
        updateFavouriteList.push(recipeData);
        console.log(recipe, recipeData, updateFavouriteList)
        Axios.put('https://fooddatabase-75cfa.firebaseio.com/favouritesList/'+this.props.dataBaseKey+'.json', updateFavouriteList)
        .then(res => console.log(res, recipeData))
        .catch(err => console.log(err, recipeData))
        this.props.onAddToFavourites(updateFavouriteList)
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
                            removeFromFavourite={this.props.removeFromFavourites}
                            ID={this.props.reciptDetail.ID !==null ? this.props.reciptDetail.ID : null}
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
        setReceips: res => dispatch(actions.setReceipts(res)),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: (details, index) => dispatch(actions.seeReciptDetail(details, index)),
        onAddToFavourites: recipes => dispatch(actions.addToFavourites(recipes)),
        removeFromFavourites: id => dispatch(actions.removeFromFavourite(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);