import React from 'react'
import { View, Text, FlatList, Alert} from 'react-native'
import Products from '../data/Products'
import { Button, Icon, ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native'




export default props => {


    function deletarProduto(produto) {
        Alert.alert ('Excluir Produto', 'Deseja excluir o produto ? ', [
            {
                text: "Sim",
                onPress(){
                    console.warn("Produto excluido")
                }
            },
            {
                text:"Não"
            }
        ]
        )
    }


    function getProductsItem({item: produto}){
        return(
            <ListItem bottomDivider >

                <ListItem.Content >
                    <ListItem.Title style={styles.titulo}>{produto.prod_nome}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subt}>{produto.prod_valor}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("ProductsForm", produto)}
                />
                <ListItem.Chevron 
                    name="delete"
                    color="red"
                    size={25}
                    onPress={()=> {deletarProduto(produto)}}
                />
            </ListItem>
        )

    }
    return(
        <View>
            <FlatList
                keyExtractor={produto => produto.prod_id.toString()}
                data={Products}
                renderItem={getProductsItem}

            />
        </View>
    )
}


const styles = StyleSheet.create({
    titulo:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    subt:{
        fontSize: 25
    }

})