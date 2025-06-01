import 'react-native-gesture-handler'; // at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenses from './src/screens/AddExpenses';
import ViewExpenses from './src/screens/ViewExpenses';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddExpenses" component={AddExpenses} options={{headerShown: false}}/>
        <Stack.Screen name="ViewExpenses" component={ViewExpenses} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
