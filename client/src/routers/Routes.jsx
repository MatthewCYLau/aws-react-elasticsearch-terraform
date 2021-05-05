import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

const Routes = () => {
    return (
        <section>
            <Switch>
                <Route exact path="/about" component={AboutPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </section>
    );
};

export default Routes;
