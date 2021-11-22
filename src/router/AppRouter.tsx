import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';

import CustomerDetails from '../screens/CustomerDetails';

import CustomersList from '../screens/CustomersList';

export type RootStackParamList = {
  CustomersList: undefined;
  CustomerDetails: { customerId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CustomersList"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.blue['500'] },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="CustomersList" component={CustomersList} options={{ title: 'Customers' }} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
