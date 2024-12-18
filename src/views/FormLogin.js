import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { API_ENDPOINT } from "../config";
import { Feather } from "@expo/vector-icons"; // Importe os ícones do Feather (ou outra biblioteca de ícones)

export default () => {
  const [valorLogin, setValorLogin] = useState("");
  const [valorSenha, setValorSenha] = useState("");
  const [salvarCredenciais, setSalvarCredenciais] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function carregarCredenciaisSalvas() {
      const loginSalvo = await AsyncStorage.getItem("loginSalvo");
      const senhaSalva = await AsyncStorage.getItem("senhaSalva");

      if (loginSalvo && senhaSalva) {
        setValorLogin(loginSalvo);
        setValorSenha(senhaSalva);
        setSalvarCredenciais(true);
      }
    }

    carregarCredenciaisSalvas();
  }, []);


  const salvarCredenciaisLocais = async () => {
    if (salvarCredenciais) {
      // Salvar login e senha localmente
      await AsyncStorage.setItem("loginSalvo", valorLogin);
      await AsyncStorage.setItem("senhaSalva", valorSenha);
    } else {
      // Remover login e senha salvos
      await AsyncStorage.removeItem("loginSalvo");
      await AsyncStorage.removeItem("senhaSalva");
    }
  };

  const buscaLogin = async () => {
    const URL = API_ENDPOINT + 'Colaboradores/BuscaLogin/';
  
    const dadosEnvio = {
      credencial: valorLogin,
      senha: valorSenha,
    };
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEnvio),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('valorLogin:', valorLogin);
        console.log('valorSenha:', valorSenha);
        console.log('data.idCol:', data.idCol);
                
        if (valorLogin === 'Admin' && valorSenha === 'G2605') {
          navigation.navigate('AdmMenu');
        } else {
          dispatch({ type: 'setColaborador', payload: { idCol: data.idCol } });
          navigation.navigate('ColMenu');
        }

        // Salvar credenciais locais se a opção estiver marcada
        salvarCredenciaisLocais();
      } else {
        console.error('Falha no login. Status:', response.status);
        const responseText = await response.text();
        console.error('Detalhes da resposta:', responseText);
      
        // Mostrar alerta com mensagem de erro
        Alert.alert('Erro', 'Falha no login. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    
      if (error.response) {
        try {
          const responseText = await error.response.text();
          console.error("Detalhes da resposta:", responseText);
    
          // Tenta analisar a resposta como JSON
          try {
            const responseData = JSON.parse(responseText);
            console.log("Resposta JSON analisada:", responseData);
          } catch (jsonError) {
            console.error("Erro ao analisar a resposta como JSON:", jsonError);
          }
        } catch (textError) {
          console.error("Erro ao obter o texto da resposta:", textError);
        }
      } else {
        console.error("Sem detalhes da resposta disponíveis.");
      }
    
      Alert.alert(
        'Erro',
        `Não foi possível conectar ao servidor. Detalhes: ${error.message}`
      );
    }
  };

  return (
    <KeyboardAvoidingView style={style.loginContainer}>
      <View style={style.loginContainer}>
        <Image source={require('../assets/infobar.png')} style={style.loginImageLogo} />
        <TextInput
          style={style.loginTextInputs}
          placeholder="Digite o login"
          value={valorLogin}
          onChangeText={(valorLogin) => setValorLogin(valorLogin)}
        />
        <View style={style.passwordContainer}>
          <TextInput
            style={style.loginTextInputs}
            placeholder="Digite a senha"
            value={valorSenha}
            onChangeText={(valorSenha) => setValorSenha(valorSenha)}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={style.showHidePasswordButton}
          >
            <Feather
              name={mostrarSenha ? "eye" : "eye-off"}
              size={20}
              color="#888888"
            />
          </TouchableOpacity>
        </View>

        <View style={style.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setSalvarCredenciais(!salvarCredenciais)}
            style={style.checkbox}
          >
            <Feather
              name={salvarCredenciais ? "check-square" : "square"}
              size={20}
              color="#888888"
            />
            <Text style={style.checkboxLabel}>Salvar Credenciais</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={style.loginButton}
          onPress={buscaLogin}
        >
          <Text style={style.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  loginContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#192B4C",
  },
  loginTextInputs:{
      backgroundColor: "#888888",
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
  
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  showHidePasswordButton: {
    position: "absolute",
    right: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: "#FFFFFF",
    marginLeft: 5,
  },
});