import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from '@rneui/base';

import PedidosList from './PedidosList';
import CodBarras from './CodBarras';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CodBarrasStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="Scanner"
      component={CodBarras}
      options={{ title: 'Realizar Compra' }}
    />
  </Stack.Navigator>
);

const PedidosStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="PedidosList"
      component={PedidosList}
      options={{ title: 'Conferir Pedidos' }}
    />
  </Stack.Navigator>
);

const ColaboradorMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#192B4C",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Pedidos"
        component={PedidosStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Código"
        component={CodBarrasStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="barcode" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ColaboradorMenu;