import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button} from 'react-native'
import { API_ENDPOINT } from '../config'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigation } from '@react-navigation/native'


export default ({route}) => {
    
    const [produto , setProduto] = useState(route.params ? route.params : {})
    const{dispatch} = useContext(UserContext)
    const navigation = useNavigation();

    

    const fazerPost = () => {
        const URL = API_ENDPOINT + 'Produtos'
        const dadosEnvio ={
            id: produto.id,
            nome: produto.prod_nome,
            valor: produto.prod_valor,
            quantidade: produto.prod_qtd,
            prod_cod: produto.prod_cod
        }

        
        const options ={
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(dadosEnvio)
        };

        fetch(URL, options)
        .then(
            (response) => {
                if(!response.ok){
                    throw new Error('A solicitação falhou')
                }
                return response.json();
            }
        ).then(
            (dadosEnvio) =>{
                console.log('Resposta do servidor: ', dadosEnvio)
                navigation.push('ProductsList')
            }
        ).catch(
            (error) =>{
                console.error(error)
            }
        )
    }

   
    return ( 
        
        <View style={style.form}>
            <Text style={style.texto}>Nome:</Text>
            <TextInput 
                style={style.input}           
                onChangeText = {prod_nome => setProduto({...produto, prod_nome}) } // atualizar o nome dentro do usuario
                placeholder = "Digite o nome"
                value={produto.prod_nome}

            />
            <Text style={style.texto}>Valor:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {prod_valor => setProduto({...produto, prod_valor}) }
            placeholder=" Digite o valor"
            value={produto.prod_valor}
            />

            <Text style={style.texto}>Quantidade:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {prod_qtd => setProduto({...produto, prod_qtd}) }
            placeholder=" Quantidade do produto"
            value={produto.prod_qtd}
            />

            <Text style={style.texto}>Código de barras:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {prod_cod => setProduto({...produto, prod_cod}) }
            placeholder=" Digite o código de barras"
            value={produto.prod_cod}
            />

            
        
            <Button 
                style={style.teste}
                title="Salvar"
                onPress = {()=> {
                    fazerPost();
                }}

            /> 

            

            <Button 
                    style={style.teste}
                    title="Voltar"
                    onPress={() => {
                        navigation.navigate('Menu');
                    }}
            />




            

        </View>
       

    )
}


const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        padding: 10,
        fontSize: 18,
        height: 40,
        borderColor: '#192B4C',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10
    },

    texto: {
     fontWeight: "bold",
     fontSize: 18
    },

    teste: {
        marginTop: 20,
        borderRadius: 30
    }
})


