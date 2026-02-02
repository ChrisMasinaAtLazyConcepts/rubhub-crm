export default theme;

// main.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './app/App';

<ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>