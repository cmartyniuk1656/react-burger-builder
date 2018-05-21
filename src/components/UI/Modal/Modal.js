import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Modal.css';


class Modal extends Component {

    //Only re-render when modal is shown
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {

        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }

}


export default Modal;