import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios ) => {


    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            //Interceptors to handle errors on request and response
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            //Remove interceptors if the component unmounts to prevent memory leak
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        //Reset the error state after an error has been confirmed
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        
        render() {
            return (
                <Auxiliary>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} /> 
            </Auxiliary>
            )
        }
    }
}

export default withErrorHandler;