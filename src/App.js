import { ThemeProvider } from 'styled-components';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <h1>MyContacts</h1>
    </ThemeProvider>
  );
}

export default App;
