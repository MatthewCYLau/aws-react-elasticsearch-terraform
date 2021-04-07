import createPalette from '@material-ui/core/styles/createPalette';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

export default (darkMode) => {
    const palette = createPalette({
        /**
         * In this example, the primary and secondary colours have been overwritten
         * using the Deloitte colour palette. When defining custom colours, the only
         * shade that must be defined is 'main' - all other colours (i.e. 'light',
         * 'dark' and 'contrastText') will be augmented from that colour. However, as
         * you can see below, these colours can also be explicitly defined.
         *
         * See: https://material-ui.com/customization/palette/
         * See: https://material-ui.com/customization/color/
         */
        primary: {
            main: '#86BC25',
            light: '#C4D600',
            contrastText: '#fff'
        },
        secondary: {
            main: '#00A3E0',
            light: '#62B5E5',
        },
        text: {
            secondary: 'rgba(0, 0, 0, 0.56)'
        },
        /**
         * Material-UI comes with two palette types, light (the default) and dark.
         * You can make the theme dark by setting type: 'dark'. While it's only a
         * single property value change, internally it modifies several palette
         * values.
         *
         * See: https://material-ui.com/customization/palette/#dark-mode
         */
        type: darkMode ? 'dark' : 'light'
    });

    /**
     * The default Material UI theme can be extended/overwritten by passing
     * options into the 'createMuiTheme' function. In this example, only the
     * palette is being overwritten, however there are many other parts of the
     * theme that can be customised including spacing, typography and screen
     * breakpoints.
     *
     * See: https://material-ui.com/customization/theming/
     * See: https://material-ui.com/customization/default-theme/
     */
    const theme = createMuiTheme({ palette });

    /**
     * You can take advantage of the overrides key of the theme object to
     * change any style injected by Material-UI into the DOM. In this example,
     * the styles for the Material-UI Link component has been overridden to
     * have a bolder font weight.
     *
     * See: https://material-ui.com/customization/globals/#css
     */
    theme.overrides = {
        MuiLink: {
            root: {
                fontWeight: 500
            }
        }
    };

    /**
     * Generate responsive typography settings.
     *
     * See: https://material-ui.com/customization/theming/#responsivefontsizes-theme-options-theme
     */
    return responsiveFontSizes(theme);
};
