import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserList from "./UserList";
import ProductsList from "./ProductsList";
import EstoqueList from "./EstoqueList";
import {Ionicons} from '@expo/vector-icons'
import { Icon } from "react-native-elements";
import { FontAwesome5, FontAwesomeIcon } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();

function Routes() {
    return(

      
    
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position:'absolute',
                    backgroundColor: "#192B4C",
                    borderTopWidth: 0,


                    

                }
                
            }}>
            

            <Tab.Screen 
                name="UserList"
                component={UserList}
                options={{
                    title:'Colaboradores',
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {                      
                        
                         return <FontAwesome5 name = "users" size={size} color={color} />
                        
                    }
                    
                    
                }}
                

            />

            <Tab.Screen 
                name="ProductsList"
                component={ProductsList}
                options={{
                    title:'Produtos',
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {                      
                        
                        return <FontAwesome5 name="shopping-cart"  size={size} color={color} />
                       
                   }
                    
                }}

            />

<           Tab.Screen 
                name="EstoqueList"
                component={EstoqueList}
                options={{
                    title:"Estoque",
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => {                      
                        
                        return <FontAwesome5 name = "list" size={size} color={color} />
                       
                   },
                   
                   
                    
                }}
                
              
            />


        </Tab.Navigator>
    
    )
}

export default Routes;