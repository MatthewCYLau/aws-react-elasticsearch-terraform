import React from 'react';
import { Container, Grid, Link, Typography } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';
import sampleImage from '../../images/home.svg';
import useStyles from './HomePage.style';

const HomePage = () => {
    const styles = useStyles();

    const sections = [
        {
            key: 'quickstart',
            icon: SpeedIcon,
            html: (
                <Typography>
                    {'This is a sample project that can be used to quickly bootstrap a '}
                    <Link color="secondary" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        React
                    </Link>
                    {' application which utilises '}
                    <Link color="secondary" href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                        Material UI
                    </Link>
                    {'. A lightweight '}
                    <Link color="secondary" href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">
                        Express
                    </Link>
                    {
                        ' server has also been included to illustrate how to deploy a production build. The code and file-structure used in this project should be used as a guideline only.'
                    }
                </Typography>
            )
        }
    ];

    return (
        <Container component="main" maxWidth="lg" className={styles.root}>
            <div className={styles.content}>
                <img className={styles.image} src={sampleImage} alt="Sample" />
                <Grid container spacing={3}>
                    {sections.map(({ icon: Icon, html, key }) => (
                        <Grid key={key} item xs={12} sm={6} md={12} className={styles.paragraph}>
                            <Icon className={styles.icon} color="primary" />
                            {html}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

HomePage.propTypes = {};

export default HomePage;
