import React from 'react'
import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import { useContext, useState  } from 'react'
import UserContext from '../context/UserContext'
import { API_ENDPOINT } from '../config'





export default props => {

    const{state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);


    const deleteApi = async (user) =>{
        const URL = API_ENDPOINT + 'Colaborador/' + user.id

        const options = {
            method: 'DELETE'
        }

        fetch(URL, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Resposta da requisição: ", responseData)
                Alert.alert(
                    'Exclusão!',
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => props.navigation.push('UserList')
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }
    


    function deletarUser(user) {
        Alert.alert ('Excluir Usuário', 'Deseja excluir o colaborador ? ', [
            {
                text: "Sim",
                onPress(){
                    deleteApi(user)
                }
            },
            {
                text:"Não"
            }
        ]
        )
    }


    function getUserItem({item: user}){
        return(
            <ListItem bottomDivider >

                <ListItem.Content >
                    <ListItem.Title style={styles.titulo}>{user.nome}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subt}>{user.total}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("UserForm", user)}
                />
                <ListItem.Chevron 
                    name="delete"
                    color="red"
                    size={25}
                    onPress={()=> {deletarUser(user)}}
                />
            </ListItem>
        )

    }
    const atualiza = ()=>{
        setIsRefreshing(true)
        props.navigation.push("GetUsersAPI")
        setIsRefreshing(false)
    }

    return(
        <View>
            <FlatList 
                data={state.users}
                keyExtractor={ user => user.id}
                renderItem={getUserItem}
                refreshControl={
                    <RefreshControl
                        onRefresh={atualiza}
                        refreshing={isRefreshing}
                    />
                }
            />
        </View>
    )



    const styles = StyleSheet.create({
        titulo:{
            fontSize: 25,
            fontWeight: 'bold'
        },
        subt:{
            fontSize: 25
        }
    
    }
    
    )
}


