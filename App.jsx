import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenses from './src/screens/AddExpenses';
import ViewExpenses from './src/screens/ViewExpenses';
import SplashScreen from './src/screens/SplashScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="AddExpenses" component={AddExpenses} options={{ headerShown: false }} />
        <Stack.Screen name="ViewExpenses" component={ViewExpenses} options={{ headerShown: false }} />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
