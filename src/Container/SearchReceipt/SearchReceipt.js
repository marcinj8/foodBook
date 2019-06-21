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
        console.log(this.state.loading , this.props.apiId, this.props.receiptList.length)

        if(this.props.apiKey !== null && this.props.apiId !== null && this.props.ingredient !== '' && this.props.receiptList.length === 0 && this.state.loading === false) {
            this.getReceipts();
            console.log('update searchingRecipes', this.props.ingredient)
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
        const recipeData = {...recipe};
        recipeData.bookmarked = true;
        console.log(recipe, recipeData)
        Axios.post('https://fooddatabase-75cfa.firebaseio.com/favourites.json', recipeData)
        .then(res => console.log(res, recipeData))
        .catch(err => console.log(err, recipeData))
        this.props.onAddToFavourites(recipeData)
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
        activeRecipe: state.activeRecipe
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReceips: res => dispatch(actions.setReceipts(res)),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: (details, index) => dispatch(actions.seeReciptDetail(details, index)),
        onAddToFavourites: recipe => dispatch(actions.addToFavourites(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);