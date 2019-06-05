import React, { Component } from 'react';

import AccessCheck from '../../Container/AccessCheck/AccessCheck';
import NavigationBlock from '../../Component/Navigation/NavigationBlock';

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
            contact: {
                active: false,
                name: 'Contact me'
            },
            purchaseList: {
                active: false,
                name: 'Purchase list'
            }
        
        },
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
        console.log(updateNavigation)
    }

    render() {

        return (
            <div>
                <h1>Receipts Book</h1>
                <NavigationBlock 
                    navigation={this.state.navigation}
                    setActiveOverlap={this.setActiveOverlapHandler}/>
                    <div className='receipts__container'>
                        <AccessCheck /> 
                    </div>
               
            </div>
        )
    }
}

export default Layout;