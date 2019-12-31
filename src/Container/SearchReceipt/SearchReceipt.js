import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
import * as actionsPurchaseList from '../../Store/Actions/actionsPurchaseList';
import ReceiptList from '../../Component/Receipts/ReceiptsList';
import ReciptDetail from '../../Component/Receipts/RecipeDetail';
import Modal from '../../Component/Modal/Modal';
import RecipesNavigation from '../../Component/Receipts/RecipesNavigation';

import './SearchReceipt.css';

class SearchReceipt extends Component {
    state = {
        currentSearching: {
            ingredient: '',
            searchFrom: 0,
            searchTo: 10
        },
        startNewSearching: false,
        loading: false,
        error: {
            occurred: false,
            message: null
        },
        showMobileModalDetail: false,
        currentScrollPositon: 0,
        showIsmoreButton: false,
        dateOfStartShowingButton: 0,
        showRecipeDetailModal: false,
        isMouseOverRecipeNavigation: false
    };

    componentDidUpdate() {
        if (window.innerWidth < 575) {
            console.log(window.innerWidth, window.outerWidth)
        }
        if (this.props.apiKey !== null && this.props.apiId !== null && this.state.loading === false) {
            this.checkIfSchouldStartNewSearching();
            if (this.state.startNewSearching) {
                this.getReceipts();
            }
        };
        if (this.props.receiptList.length > 0 && this.state.loading === true) {
            this.setLoadingToFalse();
        }
        if (this.state.currentScrollPositon !== this.props.currentScrollPositon) {
            this.scrollHandler();
        }
    };

    checkIfSchouldStartNewSearching = () => {
        if (this.props.ingredient !== this.state.currentSearching.ingredient && this.props.ingredient !== '') {
            return this.setState({
                startNewSearching: true
            })
        }
        return null
    }

    setReceips = response => {
        this.props.setReceips(response.data)
    }

    setLoadingToFalse = () => {
        this.setState({ loading: false })
    }

    setLoadingToTrue = () => {
        this.setState({
            loading: true,
        })
    }

    updateCurrentSearching = () => {
        const updateState = { ...this.state.currentSearching };
        updateState.ingredient = this.props.ingredient;

        this.setState({
            currentSearching: updateState,
            startNewSearching: false

        })
    }

    getReceipts = () => {
        this.setLoadingToTrue();
        this.props.resetRecipesState();
        this.props.setReceips(this.props.ingredient, this.props.apiId, this.props.apiKey, this.state.currentSearching.searchFrom, this.state.currentSearching.searchTo);
        this.updateCurrentSearching();
    }

    hideIsmoreButton = () => {
        const currentDate = new Date();
        if (this.state.dateOfStartShowingButton + 3000 < currentDate.getTime() && this.state.showIsmoreButton) {
            this.setState({
                showIsmoreButton: false
            })
        }
    }

    setCounterToHideButton = () => {
        let counter = null;
        if (!this.state.showIsmoreButton && this.state.dateOfStartShowingButton === 0) { // drugi warunek obowiązuje do momentu kiedy uda się zastosowac clearinterval
            return counter = setInterval(
                () => this.hideIsmoreButton(), 1000
            )
        } else if (this.state.showIsmoreButton) {
            return clearInterval(counter)
        }
    }

    showIsmoreButton = () => {
        const dateOfStartShowingButtonUpdated = new Date();
        this.setCounterToHideButton();
        this.setState({
            showIsmoreButton: true,
            dateOfStartShowingButton: dateOfStartShowingButtonUpdated.getTime()
        })
    }

    scrollHandler = () => {
        this.showIsmoreButton();
        this.setState({
            currentScrollPositon: this.props.currentScrollPositon
        })
    }

    addToFavouritesHandler = newRecipe => {
        this.props.onAddToFavourites(newRecipe);
    }

    seeReciptDetailHandler = (...args) => {
        this.props.seeReciptDetail(...args);
        this.setState({ showRecipeDetailModal: true })
    }

    closeModalHandler = () => {
        this.setState({ showRecipeDetailModal: false })
    }


    showPreviousRecipes = () => {
        const setNewSearchingData = {...this.state.currentSearching};
        if(setNewSearchingData.searchFrom > 0) {
            setNewSearchingData.searchFrom = setNewSearchingData.searchFrom - 10;
            setNewSearchingData.searchTo = setNewSearchingData.searchTo - 10;
            this.setState({
                currentSearching: setNewSearchingData,
                startNewSearching: true
            })
        }
        return null
    }

    showNextRecipes = () => {
        // sprawdź ilość przepisów
        const setNewSearchingData = {...this.state.currentSearching};
            setNewSearchingData.searchFrom = setNewSearchingData.searchFrom + 10;
            setNewSearchingData.searchTo = setNewSearchingData.searchTo + 10;
        this.setState({
            currentSearching: setNewSearchingData,
            startNewSearching: true
        })
    }

    checkIsMouseOverRecipeNavigation = isOverNavbar => {
        this.setState({
            isMouseOverRecipeNavigation: isOverNavbar
        })
    }

    render() {
        const searchRcipeStyle = ['searchRcipe__container',
            this.props.isActive
                ? 'searchRcipe__container--active'
                : 'searchRcipe__container--noActive'
        ];

        const recipeDetalModal = this.props.reciptDetail !== null
            ? (
                <Modal
                    onlyMobile={true}
                    show={this.state.showRecipeDetailModal}
                    closeModal={this.closeModalHandler}>
                    <div className='searchRcipe__recipeDetailsSlider'>
                        <ReciptDetail
                            addToPurchaseList={(...args) => this.props.addToPurchaseList(this.props.itemsToPurchase, ...args)}
                            addToFavourites={() => this.addToFavouritesHandler(this.props.reciptDetail)}
                            removeFromFavourite={(id) => this.props.removeFromFavourites(id, this.props.favouritesRecipes)}
                            ID={this.props.reciptDetail.ID}
                            isBookmarked={this.props.reciptDetail.bookmarked}
                            reciptDetail={this.props.reciptDetail.recipe} />
                    </div>
                </Modal>
            )
            : null;

        return (
            <div className={searchRcipeStyle.join(' ')}>
                <div className='searchRcipe__recipeList'>
                    {this.props.receiptList.length
                        ? <ReceiptList
                            receiptList={this.props.receiptList}
                            activeRecipe={this.props.activeRecipe}
                            seeReceiptDetail={this.seeReciptDetailHandler} />
                        : <div className='searchRcipe__loadingContainer'>Loading...</div>
                    }
                </div>
                <RecipesNavigation
                    isActive={this.props.isActive}
                    showIsmoreButton={this.state.showIsmoreButton}
                    showPreviousRecipes={this.showPreviousRecipes}
                    showNextRecipes={this.showNextRecipes}
                    isMouseOver={this.state.isMouseOverRecipeNavigation}
                    checkIsMouseOver={this.checkIsMouseOverRecipeNavigation}
                />
                {recipeDetalModal}
                <div className='searchRcipe__recipeDetails'>
                    {this.props.reciptDetail !== null
                        ? <ReciptDetail
                            isFavouriteList={false}
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
        isMore: state.recipesReducer.isMore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReceips: (...arg) => dispatch(actions.setReceipts(...arg)),
        resetRecipesState: () => dispatch(actions.resetRecipesState()),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: (details, index) => dispatch(actions.seeReciptDetail(details, index)),
        onAddToFavourites: (newRecipe) => dispatch(actions.pushUpdatedFavouriteList(newRecipe)),
        removeFromFavourites: (id, recipes) => dispatch(actions.removeFromFavourities(id, recipes)),
        addToPurchaseList: (...args) => dispatch(actionsPurchaseList.addToPurchaseList(...args))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);