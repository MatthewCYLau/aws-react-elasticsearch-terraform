import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
    root: {
        height: '100%',
        color: palette.text.primary,
        backgroundColor: palette.background.paper,
        display: 'flex',
        flexDirection: 'column'
    }
}),
{ name: 'App' });
