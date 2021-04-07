import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Link,
    Typography,
} from '@material-ui/core';
import routingImage from '../../images/routing.svg';
import useStyles from './RoutingPage.style';

const UnsupportedRoute = '/unknown';

const RoutingPage = () => {
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="lg" className={styles.root}>
            <div className={styles.content}>
                <img className={styles.image} src={routingImage} alt="Routing" />
                <div>
                    <Typography variant="h4" component="h2" paragraph>
                        Routing
                    </Typography>
                    <Typography component="p" paragraph>
                        {'This application is a Single Page Application (SPA). '}
                        <Link
                            color="secondary"
                            href="https://reactrouter.com/web/guides/quick-start"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            React Router
                        </Link>
                        {' is used to load content for each URL and maintain the browser history without the need to refresh the page.'}
                    </Typography>
                    <Typography component="p" paragraph>
                        {'The routing for the application is defined in the '}
                        <code className={styles.code}>/src/cofig/Routes.jsx</code>
                        {' file. This is where you can map URLs to page components.'}
                    </Typography>
                    <Typography component="p" paragraph>
                        {'When changing location within the app, React Router\'s '}
                        <Link
                            color="secondary"
                            href="https://reactrouter.com/web/api/history"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            history
                        </Link>
                        {' API or '}
                        <Link
                            color="secondary"
                            href="https://reactrouter.com/web/api/Redirect"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {'<Redirect>'}
                        </Link>
                        {' component should be utilised instead of '}
                        <code className={styles.code}>window.location</code>
                        .
                        {' This will efficiently update the content without having to download expensive resources unnecessarily'}
                    </Typography>
                    <Typography component="p" paragraph>
                        {'This application has built-in handling for unknown routes. Try navigating to an unsupported route such as '}
                        <Link
                            color="secondary"
                            component={RouterLink}
                            to={UnsupportedRoute}
                        >
                            {UnsupportedRoute}
                        </Link>
                        {' to see how the application responds.'}
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

RoutingPage.propTypes = {

};

export default RoutingPage;
