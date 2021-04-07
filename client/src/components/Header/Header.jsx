import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
import useStyles from './Header.style';

const Header = () => {
    const styles = useStyles();
    return (
        <AppBar component="header" position="static">
            <Toolbar>
                <Typography variant="h6" component="h1" className={styles.title}>
                    React | Material UI
                </Typography>
                <Button
                    component={Link}
                    variant="contained"
                    color="primary"
                    disableElevation
                    to="/"
                >
                    Home
                </Button>
                <Button
                    component={Link}
                    variant="contained"
                    color="primary"
                    disableElevation
                    to="/routing"
                >
                    Routing
                </Button>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {

};

export default Header;
