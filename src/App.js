import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserList from './views/UserList'
import UserForm from './views/UserForm'
import { Button, Icon } from 'react-native-elements'
import ProductsList from './views/ProductsList'
import ProductsForm from './views/ProductsForm'
import EstoqueList from './views/EstoqueList'
import FormLogin from './views/FormLogin'
import { UserProvider } from './context/UserContext';

import Routes from './views/routes'
import GetUsersAPI from './components/GetUsersAPI'


const Stack = createNativeStackNavigator()

export default props => {
    return (
    <UserProvider> 
        <NavigationContainer>
            
            <Stack.Navigator
                initialRouteName='Menu'
                screenOptions={screenOptions}>

                <Stack.Screen
                    name='UserList'
                    component={UserList}    
                    options={({navigation})=>{ //Destruction 
                        return {
                            title: "Colaboradores",
                            headerRight: () => (
                                <Button 
                                    onPress={()=> navigation.navigate("UserForm")} // navegar para UserForm
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                                
                            )
                        }
                    }}                
                    />
                <Stack.Screen 
                    name='UserForm'
                    component={UserForm}

              

                />

                <Stack.Screen 
                    name="FormLogin"
                    component={FormLogin}
                    
                />

                <Stack.Screen 
                    name="GetUsersAPI"
                    component={GetUsersAPI}
                    
                />


                <Stack.Screen
                    name='ProductsList'
                    component={ProductsList}    
                    options={({navigation})=>{ //Destruction 
                        return {
                            title: "Produtos",
                            headerRight: () => (
                                <Button 
                                    onPress={()=> navigation.navigate("ProductsForm")} // navegar para UserForm
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                                
                            )
                        }
                    }}                
                    />
                <Stack.Screen 
                    name='ProductsForm'
                    component={ProductsForm}
                    options={{
                        title: "Cadastro de produto"
                    }}
                />

                <Stack.Screen 
                    name='EstoqueList'
                    component={EstoqueList}
                    options={{
                        title: "Estoque"
                    }}
                   
                />

                <Stack.Screen 
                    name="Menu"
                    component={Routes}
                    options={({navigation})=>{ //Destruction 
                        return {
                            /*title: "Produtos",*/
                            headerRight: () => (
                                <Button 
                                    onPress={()=> navigation.navigate("ProductsForm")} // navegar para UserForm
                                    type='clear'
                                    icon={<Icon name="add" size={25} color="white" />}
                                />
                                
                            )
                        }
                    }}                
                
                />

              
                
            </Stack.Navigator>
        </NavigationContainer>
    </UserProvider>    
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#192B4C'
    },
    headerTintColor: '#ffff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}

