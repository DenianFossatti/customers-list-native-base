import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomersList from '../screens/CustomersList';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CustomersList">
        <Stack.Screen name="CustomersList" component={CustomersList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
