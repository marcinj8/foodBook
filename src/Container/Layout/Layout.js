import React, { Component } from 'react';

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
                name: 'Start'
            },
            recipe: {
                active: false,
                name: 'Recipts',
            },
            favourites: {
                active: false,
                name: 'Favourites'
            },
            purchaseList: {
                active: false,
                name: 'Purchase list'
            },
            contact: {
                active: false,
                name: 'Contact me'
            },
        },
        ingredient: '',
        isSearchingActive: false
    };

    setUpAccesData = data =>{
        const updateAccesData = {...this.state.access};
        updateAccesData.apiKey = data.apiKey;
        updateAccesData.apiId = data.user;
        this.setState({
            access: updateAccesData
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

export default Layout;