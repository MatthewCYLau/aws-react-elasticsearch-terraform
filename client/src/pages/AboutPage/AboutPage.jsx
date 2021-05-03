import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';
import routingImage from '../../images/routing.svg';
import useStyles from './AboutPage.style';

const AboutPage = () => {
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="lg" className={styles.root}>
            <div className={styles.content}>
                <img className={styles.image} src={routingImage} alt="Routing" />
                <div>
                    <Typography variant="h4" component="h2" paragraph>
                        About
                    </Typography>
                    <Typography component="p" paragraph>
                        {'This application is a Single Page Application (SPA) powered by '}
                        <Link
                            color="secondary"
                            href="https://aws.amazon.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Amazon Web Services
                        </Link>
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

AboutPage.propTypes = {};

export default AboutPage;
