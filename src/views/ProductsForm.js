import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API_ENDPOINT } from '../config';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default ({ route, navigation }) => {
  const [produto, setProduto] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UserContext);

  const CriaProduto = () => {
    const URL = API_ENDPOINT + 'Produtos/AddProduto/';

    const dadosEnvio = {
      idProduto: produto.idProduto,
      nomeProd: produto.nomeProd,
      preco: produto.preco,
      quantidade: produto.quantidade,
      codBarras: produto.codBarras,
    };

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosEnvio),
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
        return response.json();
      })
      .then((dadosEnvio) => {
        console.log('Resposta do servidor: ', dadosEnvio);
        // Correção na navegação para 'UserList'
        navigation.navigate('ProductsList');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(nomeProd) => setProduto({ ...produto, nomeProd })}
          placeholder="Digite o nome do produto"
          value={produto.nomeProd}
        />

        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(preco) => setProduto({ ...produto, preco })}
          placeholder="Digite o preço"
          value={produto.preco}
        />

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(quantidade) => setProduto({ ...produto, quantidade })}
          placeholder="Digite a quantidade"
          value={produto.quantidade}
        />

        <Text style={styles.label}>Código do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(codBarras) => setProduto({ ...produto, codBarras })}
          placeholder="Digite o código de barras"
          value={produto.codBarras}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]} // Verde
            onPress={() => {
              CriaProduto();
            }}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <View style={styles.buttonSeparator} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF0000' }]} // Vermelho
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192B4C', // cor dark desejada
  },
  form: {
    width: '80%',
    backgroundColor: '#fff', // cor branca para o formulário
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#192B4C', // cor da borda das inputs
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#192B4C', // cor dark desejada
  },
  input: {
    padding: 10,
    fontSize: 14,
    height: 40,
    borderColor: '#3498db', // azul pomegranate
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    color: '#192B4C', // cor dark desejada
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden', // para aplicar o borderRadius no Android
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSeparator: {
    width: 10,
  },
});
