import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../Store/Actions/actions';
import ReceiptList from '../../Component/Receipts/ReceiptsList';
import ReciptDetail from '../../Component/Receipts/RecipeDetail';

import './SearchReceipt.css';

class SearchReceipt extends Component {
    state = {
        loading: false,
        error: {
            occurred: false,
            message: null
        },
        premission: false
    };

    componentWillMount () {
        if(this.props.apiKey !== null && this.props.apiId !== null ) {
            this.getReceipts();
        };
    };

    componentDidUpdate () {
        if(this.props.apiKey !== null && this.props.apiId !== null && this.props.receiptList === null) {
            this.getReceipts();
        };
    };
    
    setReceips = response => {
        console.log(response)
        this.props.setReceips(response.data)
        
    }


    getReceipts = () => {
        Axios.get(`https://api.edamam.com/search?q=beef&app_id=${this.props.apiId}&app_key=${this.props.apiKey}&from=10&to=20`)
        .then(res => this.setReceips(res))
        .catch(err => this.props.errorHandler(err))
    }

    render() {
        return(
            <div className='searchReveipt__container'>
                <div>
                    {this.props.receipts !== null
                        ? <ReceiptList 
                            receiptList={this.props.receiptList} 
                            seeReceiptDetail={this.props.seeReciptDetail}/>
                        : <div>Loading...</div>
                    }
                </div>
                <div>
                    {this.props.reciptDetail !== null
                        ? <ReciptDetail 
                            reciptDetail={this.props.reciptDetail}/>
                        : <div>Choose recipe</div>
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
        reciptDetail: state.reciptDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setReceips: res => dispatch(actions.serReceipts(res)),
        errorHandler: err => dispatch(actions.errorHandler(err)),
        seeReciptDetail: details => dispatch(actions.seeReciptDetail(details))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceipt);