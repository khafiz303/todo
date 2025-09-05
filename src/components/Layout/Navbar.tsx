import React, { useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { UseThemeContext } from '@/theme/ThemeProviderWrapper';

export const Navbar: React.FC = React.memo(() => {
  const { toggleTheme, mode } = UseThemeContext();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App
        </Typography>

        <IconButton color="inherit" onClick={handleToggleTheme}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});
