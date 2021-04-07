import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RoutingPage from '../pages/RoutingPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * React Router's <Switch> component looks through all its
 * child <Route> elements and renders the first one whose
 * path matches the current URL. Use a <Switch> any time
 * you have multiple routes, but you want only one of them
 * to render at a time.
 * (See: https://reactrouter.com/web/example/basic)
 *
 * NOTE: You can use the last <Route> in a <Switch> as a
 * kind of "fallback" route, to catch 404 errors.
 * (See: https://reactrouter.com/web/example/no-match)
 */
const Routes = () => (
    <Switch>
        <Route exact path="/routing" component={RoutingPage} />
        <Route component={NotFoundPage} />
    </Switch>
);

export default Routes;
