import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
    root: {
        flex: 1,
        display: 'flex',
        overflow: 'auto',
        paddingTop: spacing(3),
        paddingBottom: spacing(3)
    },
    content: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [breakpoints.up('md')]: {
            flexDirection: 'row',
        }
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        maxWidth: 300,
        width: '100%',
        marginBottom: spacing(3),
        [breakpoints.up('md')]: {
            maxWidth: 400,
            marginBottom: 0,
            marginRight: spacing(3)
        }
    },
    paragraph: {
        display: 'flex',
        '&:last-child': {
            marginBottom: 0
        }
    },
    icon: {
        marginRight: spacing(2),
        fontSize: '2.8rem'
    }
}),
{ name: 'HomePage' });
