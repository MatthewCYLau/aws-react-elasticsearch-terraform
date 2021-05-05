import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import Routes from './routers/Routes';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

// AntUI
import { Layout } from 'antd';

const App = () => (
    <Router>
        <Fragment>
            <Layout className="layout" style={styles.layout}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route component={Routes} />
                </Switch>
                <Footer />
            </Layout>
        </Fragment>
    </Router>
);

const styles = {
    layout: {
        minHeight: '100vh'
    }
};
export default App;
