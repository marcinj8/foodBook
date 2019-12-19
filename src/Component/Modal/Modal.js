import React from 'react';
import Backdrop from './Backdrop';

import './Modal.css'

const modal = props => {
    let modalStyle = [];

    if (props.style) {
        modalStyle = [props.style,
            props.show
                ? props.style + '--show'
                : props.style + '--hide'];

    } else {
        modalStyle = ['modal',
            props.show
                ? 'modal--show'
                : 'modal--hide'];
    }
    console.log(props.show)
    return (
        <div>
            <Backdrop clicked={props.closeModal} show={props.show} />
            <div className={modalStyle.join(' ')}>
                <div>
                    {props.children}
                </div>
                <button 
                    className='modal__button--closeModal'
                    onClick={props.closeModal}>Close</button>
            </div>
        </div>
    )
}

export default modal;