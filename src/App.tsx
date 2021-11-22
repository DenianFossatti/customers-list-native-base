import { NativeBaseProvider } from 'native-base';

import theme from './nativeBase/theme';

import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <NativeBaseProvider theme={theme} config={{ suppressColorAccessibilityWarning: true }}>
      <AppRouter />
    </NativeBaseProvider>
  );
};

export default App;
