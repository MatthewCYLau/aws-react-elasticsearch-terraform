import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'auto',
        paddingTop: spacing(3),
        paddingBottom: spacing(3)
    },
    image: {
        maxHeight: '50%',
        width: '100%',
        marginBottom: spacing(3),
    }
}),
{ name: 'NotFoundPage' });
