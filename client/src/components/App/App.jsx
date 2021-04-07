import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useStyles from './App.style';
import createTheme from '../../config/Theme';

import Routes from '../../config/Routes';
import Header from '../Header';
import HomePage from '../../pages/HomePage';

function App() {
    const styles = useStyles();

    return (
        <Router>
            <div className={styles.root}>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route component={Routes} />
                </Switch>
            </div>
        </Router>
    );
}

export default () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => createTheme(prefersDarkMode), [
        prefersDarkMode
    ]);

    return (
        /**
         * The entire application is wrapped in the Material UI theme
         * provider. All components can and should be styled using the
         * theme object. In particular, spacing (i.e. margins and
         * padding) should be defined using the 'theme.spacing' method
         * and colours should be accessed via the 'theme.palette' object.
         * By always using the theme object to style components, changes
         * only need to be made in one place (config/Theme.js) and the
         * entire application will have its appearance updated consistantly.
         *
         * See: https://material-ui.com/styles/api/#themeprovider
         */
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    );
};
