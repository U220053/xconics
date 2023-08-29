import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useMemo } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// locales
import { useLocales } from 'src/locales';
// components
import { useSettingsContext } from 'src/components/settings';
// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
// options

import { contrast } from './options/contrast';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { currentLang } = useLocales();
  const settings = useSettingsContext();
  const contrastOption = contrast(settings.themeContrast === 'bold', settings.themeMode);

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        baseOption,
      ),
    [baseOption]
  );

  const theme = createTheme(memoizedValue);

  theme.components = merge(componentsOverrides(theme), contrastOption.components);

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  );

  return (
    <MuiThemeProvider theme={themeWithLocale}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
