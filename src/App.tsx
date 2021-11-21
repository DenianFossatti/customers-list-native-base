import { NativeBaseProvider } from 'native-base';

import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <NativeBaseProvider>
      <AppRouter />
    </NativeBaseProvider>
  );
};

export default App;
