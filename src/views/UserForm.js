import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { API_ENDPOINT } from '../config';

export default ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    // Verifica se há um usuário passado como parâmetro
    const { user: userParam } = route.params;
    if (userParam) {
      setUser(userParam);
    }
  }, [route.params]);

  const salvarColaborador = () => {
    const URL = user.idCol
      ? API_ENDPOINT + `Colaboradores/EditColaborador/${user.idCol}` // URL para atualizar um colaborador existente
      : API_ENDPOINT + 'Colaboradores/AddColaborador/'; // URL para adicionar um novo colaborador
  
    const method = user.idCol ? 'PUT' : 'POST'; // Método PUT para atualizar, POST para criar
  
    const dadosEnvio = {
      IdCol: user.idCol,
      Nome: user.nome,
      Email: user.email,
      DataNascimento: user.dataNascimento,
      Credencial: user.credencial,
      Senha: user.senha,
      Cargo: user.cargo,
    };
  
    const options = {
      method: method,
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
      .then((dados) => {
        console.log('Resposta do servidor: ', dados);
        navigation.navigate('UserList');
      })
      .catch((error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error('Erro na solicitação: ', error);
      });;
  };


  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(nome) => setUser({ ...user, nome })}
          placeholder="Digite o nome"
          value={user.nome}
        />

        <Text style={styles.label}>Credencial:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(credencial) => setUser({ ...user, credencial })}
          placeholder="Credencial do colaborador"
          value={user.credencial}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(senha) => setUser({ ...user, senha })}
          placeholder="Senha do colaborador"
          value={user.senha}
        />

        <Text style={styles.label}>Cargo:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(cargo) => setUser({ ...user, cargo })}
          placeholder="Cargo do colaborador"
          value={user.cargo}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setUser({ ...user, email })}
          placeholder="Email do colaborador"
          value={user.email}
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(dataNascimento) =>
            setUser({ ...user, dataNascimento })
          }
          placeholder="Digite a data de nascimento"
          value={user.dataNascimento}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Salvar"
              onPress={() => {
                salvarColaborador();
              }}
              color="#27ae60" // verde esmeralda
            />
          </View>
          <View style={styles.buttonSeparator} />
          <View style={styles.button}>
            <Button
              title="Voltar"
              onPress={() => {
                navigation.goBack();
              }}
              color="#c0392b" // vermelho alizarina
            />
          </View>
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
  },
  buttonSeparator: {
    width: 10,
  },
});