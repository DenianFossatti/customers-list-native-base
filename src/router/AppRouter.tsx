import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerDetails from '../screens/CustomerDetails';

import CustomersList from '../screens/CustomersList';

export type RootStackParamList = {
  CustomersList: undefined;
  CustomerDetails: { customerId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CustomersList">
        <Stack.Screen name="CustomersList" component={CustomersList} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
