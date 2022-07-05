import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import { useHeaderStyles } from 'layouts/auth/partials/header/header.styles';
import { LanguageSwitcher } from 'layouts/auth/partials/language-switcher';
import { useWidth } from 'modules/common/hooks';
import LogoDarkIcon from 'modules/common/icons/ROQ-logo-dark.svg';
import LogoLightIcon from 'modules/common/icons/ROQ-logo-light.svg';
import { FunctionComponent, useMemo } from 'react';

export interface HeaderInterface extends GridProps {}

export const Header: FunctionComponent<HeaderInterface> = () => {
  const theme = useTheme();
  const classes = useHeaderStyles();
  const breakpoint = useWidth();

  const LogoIcon = useMemo(
    () => (theme.palette.mode === 'light' ? LogoLightIcon : LogoDarkIcon),
    [theme.palette.mode, breakpoint],
  );

  return (
    <Grid
      container
      component="header"
      className={classes.root}
      sx={{ justifyContent: { sm: 'space-between', xs: 'flex-end' }, mb: 5 }}
    >
      <Grid
        container
        item
        xs={2}
        className={classes.logoWrapper}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item>
          <SvgIcon component={LogoIcon} viewBox="0 0 50 24" className={classes.logo} />
        </Grid>
      </Grid>

      <Grid item xs={10} className={classes.languageSwitcherWrapper}>
        <Box className={classes.languageSwitcherMenuWrapper}>
          <LanguageSwitcher />
        </Box>
      </Grid>
    </Grid>
  );
};
