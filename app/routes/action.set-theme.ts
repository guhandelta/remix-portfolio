import { createThemeAction } from 'remix-themes';
import { themeSessionResolver } from '~/utils/session.server';

// Creating a route for "/action/set-theme"(provided under themeAction in ThemeProvider), here would make sure that the selected/currently_active theme(dark/light mode) is retained, even after page refresh
export const action = createThemeAction(themeSessionResolver);