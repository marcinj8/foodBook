import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccessCheck from '../../Container/AccessCheck/AccessCheck';
import NavigationBlock from '../../Component/Navigation/NavigationBlock';
import StartPage from '../StartPage/StartPage';
import SearchReceipt from '../SearchReceipt/SearchReceipt';
import FavouriteRecipes from '../FavouriteRecipes/FavouriteRecipes';
import ContactForm from '../ContactForm/ContactForm';
import PurchaseList from '../PurchaseList/PurchaseList';
import Logo from '../../Component/Logo/Logo.js';
import Footer from '../../Component/Footer/Footer.js';

class Layout extends Component {
  state = {
    navigation: {
      start: {
        active: true,
        disabled: false,
        name: 'Start',
      },
      recipe: {
        active: false,
        disabled: true,
        name: 'Recipes',
      },
      favourites: {
        active: false,
        disabled: true,
        name: 'Favourites',
      },
      purchaseList: {
        active: false,
        disabled: true,
        name: 'Purchase list',
      },
      contact: {
        active: false,
        disabled: false,
        name: 'Contact',
      },
    },
    ingredient: '',
    isSearchingActive: false,
    disableInput: true,
  };

  componentDidUpdate() {
    if (
      this.state.disableInput &&
      this.props.apiKey !== null &&
      this.props.apiId !== null
    ) {
      this.activateSearchingButton();
      this.activateOverlap('favourites', 'purchaseList');
    }
  }

  makeCopy = object => {
    if (Array.isArray(object)) {
      return this.copyArr(object);
    } else if (typeof object === 'object') {
      this.copyObj(object);
    }
    return object;
  };

  activateSearchingButton = () => {
    this.setState({
      disableInput: false,
    });
  };

  activateOverlap = (...data) => {
    const overlapsToActivate = [...data];
    const updatedNavigation = this.makeCopy(this.state.navigation);

    overlapsToActivate.map(overlap => {
      return Object.keys(updatedNavigation).map(updatedNavitagionItem => {
        if (overlap === updatedNavitagionItem) {
          updatedNavigation[overlap].disabled = false;
        }
        return updatedNavigation
      });
    });

    this.setState({
      navigation: updatedNavigation,
    });
  };

  copyArr = arr => {
    return arr.map(item => this.makeCopy(item));
  };

  copyObj = obj => {
    const newObj = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = this.makeCopy(obj[key]);
      }
      return newObj;
    }
  };

  setUnactiveOverlap = navigation => {
    const updateNavigationActiveProperty = navigation;
    for (let key in navigation) {
      navigation[key].active = false;
    }
    this.setState({
      navigation: updateNavigationActiveProperty,
    });
    return navigation;
  };

  setActiveOverlapHandler = ID => {
    const updateNavigation = this.makeCopy(this.state.navigation);
    this.setUnactiveOverlap(updateNavigation);
    updateNavigation[ID].active = true;
    this.setState({
      navigation: updateNavigation,
    });
  };

  searchRecipesHandler = ingredient => {
    this.setState({ ingredient: ingredient });
    this.setActiveOverlapHandler('recipe');
  };

  render() {
    return (
      <div style={{ margin: '0', padding: '0', minHeight: '90vh' }}>
        <Logo />
        <NavigationBlock
          ingredientInputValue={this.state.ingredient}
          navigation={this.state.navigation}
          setActiveOverlap={this.setActiveOverlapHandler}
        />
        <div className="page__container">
          <StartPage
            activateReceipts={this.activateOverlap}
            disableInput={this.state.disableInput}
            searchRecipes={this.searchRecipesHandler}
            isActive={this.state.navigation.start.active}
          />
          <AccessCheck isActive={this.state.navigation.recipe.active} />
          <SearchReceipt
            ingredient={this.state.ingredient}
            isActive={this.state.navigation.recipe.active}
          />
          <FavouriteRecipes
            isActive={this.state.navigation.favourites.active}
          />
          <PurchaseList isActive={this.state.navigation.purchaseList.active} />
          <ContactForm isActive={this.state.navigation.contact.active} />
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    apiKey: state.recipesReducer.access.apiKey,
    apiId: state.recipesReducer.access.apiId,
  };
};

export default connect(mapStateToprops)(Layout);
