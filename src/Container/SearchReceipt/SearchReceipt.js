import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { isFlowBaseAnnotation } from '@babel/types';

const YOUR_APP_ID = '0aefacbc';
const YOUR_APP_KEY = 'be2139700598dbffcb502ef8eb83fb5c';

class SearchReceipt extends Component {
    state = {
        recepipts: {},
        loading: false,
        error: {
            occurred: false,
            message: null
        },
        premission: isFlowBaseAnnotation
    };

    componentWillMount () {
        if(this.state.apiKey != null && this.state.apiId != null ) {
            console.log(this.props.apiKey)
            console.log(this.props.apiId)
            this.getReceipts();
        };
        if(this.state.premission === false) {
            if(this.state.apiKey != null && this.state.apiId != null) {
                this.setState({premission: true})
                console.lot(this.state)
            }
        }
    };

    componentWillUpdate () {
        console.log('updated')
        console.log(this.props.apiKey)
        console.log(this.props.apiId)
        if(this.state.apiKey != null && this.state.apiId != null ) {
            console.log(this.props.apiKey)
            console.log(this.props.apiId)
            this.getReceipts();
        };
        if(this.state.premission === false) {
            if(this.state.apiKey != null && this.state.apiId != null) {
                this.setState({premission: true})
                console.lot(this.state)
            }
        }
    };

    getReceipts = () => {
        Axios.get(`https://api.edamam.com/search?q=beef&app_id=${this.props.apiId}&app_key=${this.props.apiKey}`)
        // Axios.get(`https://api.edamam.com/search?q=beef&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.apiKey !== 0 && this.state.apiId !== 0 ) {
            console.log(this.state.apiKey !== null , this.state.apiId !== null)
            console.log(this.props.apiKey)
            console.log(this.props.apiId)
            this.getReceipts();
        };
        return(
            <div>
                searcher
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        apiKey: state.access.apiKey,
        apiId: state.access.apiId
    }
}

export default connect(mapStateToProps)(SearchReceipt);