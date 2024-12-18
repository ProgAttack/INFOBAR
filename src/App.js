import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserProvider } from './context/UserContext';
import FormLogin from './views/FormLogin';
import AdministradorMenu from './views/AdmMenu';
import ColaboradorMenu from './views/ColMenu';


const Stack = createStackNavigator();



export default App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormLogin">
      <Stack.Screen
        name="FormLogin"
        component={FormLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdmMenu"
        options={{ headerShown: false }}
      >
        {(props) => <AdministradorMenu {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="ColMenu"
        options={{ headerShown: false }}
      >
        {(props) => <ColaboradorMenu {...props} />}
      </Stack.Screen>
      
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}; 

