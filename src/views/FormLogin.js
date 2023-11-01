import { TouchableOpacity, Image, Text, TextInput, View, KeyboardAvoidingView, StyleSheet } from "react-native"
import { useContext, useState } from "react"
import UserContext from "../context/UserContext";




export default props => {
    [valorLogin, setValorLogin] = useState("");
    [valorSenha, setValorSenha] = useState("");
    const {state} = useContext(UserContext);

    return(
        <KeyboardAvoidingView  style={style.loginContainer}>
            <View style={style.loginContainer}>
                <Image source={require('../assets/infobar.png')} style={style.loginImageLogo} />
                <TextInput 
                    style={style.loginTextInputs}
                    placeholder="Digite o login"
                    value={valorLogin}
                    onChangeText={ (valorLogin) => setValorLogin(valorLogin)}
                />
                <TextInput
                    style={style.loginTextInputs}
                    placeholder="Digite a senha"
                    value={valorSenha}
                    onChangeText={ (valorSenha) => setValorSenha(valorSenha) }
                    secureTextEntry={true}
                />
                
                <TouchableOpacity 
                    style={style.loginButton}
                    onPress={ ()=> {
                        const userLogado = state.users.filter( u => u.login === valorLogin)[0]
                        if(userLogado){
                            userLogado.senha == valorSenha ? props.navigation.navigate("UserList") : console.warn("Usuário e/ou Senha incorreta!")
                        }else{
                            console.warn("Usuário e/ou Senha incorreta!")
                        }
                    }}
                >
                    <Text style={style.loginButtonText}>LOGIN</Text>    
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
   
    )
}


const style = StyleSheet.create({
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192B4C",
    },
    loginTextInputs:{
        backgroundColor: "#ffff",
        width: 300,
        height: 55,
        marginTop: 30,
        fontSize: 15,
        borderRadius: 30,
        padding: 10,
        color: "#084160",
        borderColor: "#192B4C"
        
    },
    loginButtonText:{
        color: 'white',
    },
    loginButton:{
        width: 300,
        height: 55,
        backgroundColor: "#192B4C",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        borderColor: "#192B4C"
        
    },
    loginImageLogo:{
        width: 300 ,
        height: 100,
    },
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffff",
    },
})