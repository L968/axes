import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Index from './pages/Index/index';
import Main from './pages/Main/index';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <PrivateRoute path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}