import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccessCheck from '../../Container/AccessCheck/AccessCheck';
import NavigationBlock from '../../Component/Navigation/NavigationBlock';
import StartPage from '../StartPage/StartPage';
import SearchReceipt from '../SearchReceipt/SearchReceipt';
import FavouriteRecipes from '../FavouriteRecipes/FavouriteRecipes';
import ContactForm from '../ContactForm/ContactForm';
import PurchaseList from '../PurchaseList/PurchaseList';

class Layout extends Component {
    state = {
        navigation: {
            start: {
                active: true,
                disabled: false,
                name: 'Start'
            },
            recipe: {
                active: false,
                disabled: false,
                name: 'Recipts',
            },
            favourites: {
                active: false,
                disabled: false,
                name: 'Favourites'
            },
            purchaseList: {
                active: false,
                disabled: false,
                name: 'Purchase list'
            },
            contact: {
                active: false,
                disabled: false,
                name: 'Contact me'
            },
        },
        ingredient: '',
        isSearchingActive: false,
        disableSearchButton: true
    };

    componentDidUpdate () {
        if (this.state.disableSearchButton && this.props.apiKey !== null && this.props.apiId !== null) {
            this.activateSearchingButton();
        }
    }

    activateSearchingButton = () => {
        this.setState({
            disableSearchButton: false
        })
    } 

    copyArr = arr => {
        return arr.map(item => this.makeCopy(item));
    }

    copyObj = obj => {
        const newObj = {};
            
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = this.makeCopy(obj[key]);
            }
            return newObj;
        }
    }

    makeCopy = object => {
        if (Array.isArray(object)) {
            return this.copyArr(object)
        } else if (typeof(object) === 'object') {
            this.copyObj(object)
        }
        return object
    }

    setUnactiveOverlap = navigation => {
        const updateNavigationActiveProperty = navigation;
        for (let key in navigation) {
            navigation[key].active = false;
        }
        this.setState( {
            navigation: updateNavigationActiveProperty
        })
        return navigation
    }

    setActiveOverlapHandler = ID => {
        const updateNavigation = this.makeCopy(this.state.navigation);
        this.setUnactiveOverlap(updateNavigation)
        updateNavigation[ID].active = true;
        this.setState({
            navigation: updateNavigation
        })
    }

    searchRecipesHandler = ingredient => {
        this.setState({ingredient: ingredient})
        this.setActiveOverlapHandler('recipe');
    }

    render() {
        return (
            <div>
                <h1>Receipts Book</h1>
                <NavigationBlock
                    ingredientInputValue={this.state.ingredient}
                    navigation={this.state.navigation}
                    setActiveOverlap={this.setActiveOverlapHandler}/>
                <div className='page__container'>
                    <StartPage
                        disableSearchButton={this.state.disableSearchButton}
                        searchRecipes={this.searchRecipesHandler}
                        isActive={this.state.navigation.start.active} />
                    <AccessCheck
                        isActive={this.state.navigation.recipe.active}/>
                    <SearchReceipt
                        ingredient={this.state.ingredient}
                        isActive={this.state.navigation.recipe.active}/>
                    <FavouriteRecipes 
                        isActive={this.state.navigation.favourites.active} />
                    <PurchaseList 
                        isActive={this.state.navigation.purchaseList.active} />
                    <ContactForm 
                        isActive={this.state.navigation.contact.active} />
                </div>
               
            </div>
        )
    }
}

const mapStateToprops = state => {
    return {
        apiKey: state.access.apiKey,
        apiId: state.access.apiId
    }
}

export default connect(mapStateToprops)(Layout);