import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button} from 'react-native'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import { API_ENDPOINT } from '../config'


export default ({route, navigation}) => {
    
    const [user, setUser] = useState(route.params ? route.params : {})
    const{dispatch} = useContext(UserContext)

    const fazerPost = () => {
        const URL = API_ENDPOINT + 'Colaborador'
        const dadosEnvio ={
            id: user.id,
            nome: user.nome,
            email: user.email,
            cargo: user.cargo,
            datanasc: user.datanasc,
            login: user.credencial,
            senha: user.senha
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
                navigation.push('UserList')
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
                onChangeText = {nome => setUser({...user, nome}) } // atualizar o nome dentro do usuario
                placeholder = "Digite o nome"
                value={user.nome}

            />
            <Text style={style.texto}>Cargo:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {cargo => setUser({...user, cargo}) }
            placeholder=" Digite o cargo"
            value={user.cargo}
            />

            <Text style={style.texto}>Login:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {login => setUser({...user, login}) }
            placeholder=" Credencial do colaborador"
            value={user.login}
            />

            <Text style={style.texto}>Senha:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {senha => setUser({...user, senha}) }
            placeholder=" Senha do colaborador"
            value={user.senha}
            />

            <Text style={style.texto}>Email:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {email => setUser({...user, email}) }
            placeholder=" Senha do colaborador"
            value={user.email}
            />

            <Text style={style.texto}>Data de Nascimento:</Text>
            <TextInput 
            style={style.input}
            onChangeText = {datanasc => setUser({...user, datanasc}) }
            placeholder=" Digite da data de nascimento"
            value={user.datanasc}
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
                        navigation.goBack()
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