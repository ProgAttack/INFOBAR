import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { API_ENDPOINT } from '../config';
import { Button } from 'react-native-elements';
import { Alert, View } from 'react-native';
import UserList from './UserList';
import ProductsList from './ProductsList';
import UserForm from './UserForm';
import ProductsForm from './ProductsForm';
import UserOrders from './UserOrders';
import OrdersListScreen from './OrdersListScreen';
import { Icon } from '@rneui/base';
import { FontAwesome5 } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const UserStackNavigator = ({ navigation }) => (
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
      name="UserList"
      component={UserList}
      options={() => ({
        title: 'Lista de Colaboradores',
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="add"
              color="white"
              onPress={() => {
                navigation.navigate('UserForm');
                console.log('Botão de adição pressionado!');
              }}
              containerStyle={{ marginRight: 10 }}
            />
            <Icon
              name="check"
              color="white"
              onPress={() => {
                Alert.alert(
                  'Confirmação',
                  'Tem certeza que deseja finalizar todos os pedidos?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Confirmar',
                      onPress: async () => {
                        try {
                          const response = await fetch(
                            `${API_ENDPOINT}Colaboradores/FinalizarPedidosTodos`,
                            {
                              method: 'POST',
                            }
                          );

                          if (!response.ok) {
                            throw new Error(
                              `Erro na solicitação HTTP: ${response.status} - ${response.statusText}`
                            );
                          }

                          const contentType = response.headers.get('content-type');
                          if (contentType && contentType.includes('application/json')) {
                            const data = await response.json();
                            console.log(data);
                          } else {
                            console.warn('A resposta não contém JSON:', response);
                          }
                        
                        } catch (error) {
                          console.error('Erro:', error);
                        }
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            />
          </View>
        ),
      })}
    />

    <Stack.Screen
      name="UserForm"
      component={UserForm}
      options={{ title: 'Adicionar Colaborador' }}
    />
    <Stack.Screen
      name="UserOrders"
      options={{ title: 'Pedidos' }}
    >
      {(props) => <UserOrders {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="OrdersList"
      component={OrdersListScreen}
      options={({ route, navigation }) => ({
        title: `Pedidos de ${route.params?.userName || 'Colaborador'}`,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate("ProductsForm")}
            type='clear'
            icon={<Icon name="add" size={25} color="white" />}
          />

        ),
      })}
    />
  </Stack.Navigator>
);

const ProdutoStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C', // Cor de fundo do header
      },
      headerTintColor: '#FFFFFF', // Cor do texto do header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="ProductsList"
      component={ProductsList}
      options={() => ({
        title: 'Lista de Produtos',
        headerRight: () => (
         icon= <Icon
            name="add"
            color="white"  
            onPress={() => {
              navigation.navigate('ProductsForm');
              console.log('Botão de adição pressionado!');
            }}
            containerStyle={{ marginRight: 10 }}
          />
          
          
        ),
      })
    } 
    />
    <Stack.Screen
      name="ProductsForm"
      component={ProductsForm}
      options={{ title: 'Adicionar Produto' }}
    />
  </Stack.Navigator>
);

const OrdersStackNavigation = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C', // Cor de fundo do header
      },
      headerTintColor: '#FFFFFF', // Cor do texto do header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    
  </Stack.Navigator>
)

const AdministradorMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#192B4C',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tab.Screen
        name="Colaboradores"
        component={UserStackNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Produtos"
        component={ProdutoStackNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="tasks" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
export default AdministradorMenu;
