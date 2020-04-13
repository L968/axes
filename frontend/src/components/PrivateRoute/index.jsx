import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../../services/api';

export default class PrivateRoute extends Component {

    state = {
        isAuthenticated: '',
        user_id: ''
    };

    componentDidMount() {
        const token = localStorage.getItem('SESSIONJWT');

        if (token === null) {
            return this.setState({ isAuthenticated: false });
        }

        api.get('/authenticate', { headers: { authorization: token } })
        .then(res => {
            this.setState({
                isAuthenticated: res.data.isAuthenticated,
                user_id: res.data.user_id
            })
        })
        .catch(error => this.setState({ isAuthenticated: false }));
    };

    render() {
        const { component: Component, ...rest } = this.props;
        const { isAuthenticated, user_id } = this.state;

        if (this.state.isAuthenticated === '') {
            return null;
        }

        return (
            <Route {...rest} render={props => (
                isAuthenticated
                    ? <Component {...props} user_id={user_id} />
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )} />
        )
    }
};