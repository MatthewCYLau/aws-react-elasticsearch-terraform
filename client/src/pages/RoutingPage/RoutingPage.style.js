import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints, palette }) => ({
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
    code: {
        fontWeight: 'bold',
        background: palette.grey[200],
        borderRadius: 4,
        padding: spacing(0.5, 0.75)
    }
}),
{ name: 'RoutingPage' });
