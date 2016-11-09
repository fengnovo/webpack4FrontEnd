import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'; // hashHistory, browserHistory

import App from './pages/app.jsx';
import List from './pages/list.jsx';
import Detail from './pages/detail.jsx';

const historyOptions = {
    queryKey : false
};

const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ List }/>
            <Route path='list' component={ List } />
            <Route path='detail/:id' component={ Detail } />
        </Route>
    </Router>
);

export default routes;