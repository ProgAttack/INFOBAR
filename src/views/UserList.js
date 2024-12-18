import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';

import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { API_ENDPOINT } from '../config';

export default (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dados, setDados] = useState([]);

  const getUsers = () => {
    const URL = `${API_ENDPOINT}Colaboradores/ValorTotal`;
  
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  
    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }
        return response.json();
      })
      .then((dadosComValorTotal) => {
        setDados(dadosComValorTotal);
      })
      .catch((error) => {
        console.error(`Erro ao obter dados dos colaboradores: ${error.message}`);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteApi = async (user) => {
    const URL = API_ENDPOINT + 'Colaboradores/DeleteCol/' + user.idCol;

    const options = {
      method: 'DELETE',
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na solicitação HTTP');
        }
        return response;
      })
      .then((responseData) => {
        Alert.alert('Exclusão!', 'Usuário excluído com sucesso!', [
          {
            text: 'Ok',
          },
        ]);
        getUsers();
      })
      .catch((error) => {
        console.error('Erro: ', error);
      });
  };

  function deletarUser(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o colaborador? ', [
      {
        text: 'Sim',
        onPress() {
          deleteApi(user);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }
  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
       
        bottomDivider
        containerStyle={styles.listItemContainer}
        onPress={() => {
          props.navigation.navigate('UserOrders', { idCol: user.idCol, userName: user.nome });
        }}
      >
        <ListItem.Content>
          <View style={styles.row}>
            <Text style={styles.titulo}>{user.nome}</Text>
            <Text style={styles.valorTotal}>{user.valorTotal ? ` -  R$ ${user.valorTotal.toFixed(2)}` : ' - R$ 0,00'}</Text>
          </View>
        </ListItem.Content>
        <ListItem.Chevron
          name="edit"
          color="orange"
          size={25}
          onPress={() => props.navigation.navigate('UserForm', { user })}
        />
        <ListItem.Chevron
          name="delete"
          color="red"
          size={25}
          onPress={() => deletarUser(user)}
        />
      </ListItem>
    );
  };
  
  const atualiza = () => {
    setIsRefreshing(true);
    getUsers();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(user) => user.idCol}
        renderItem={getUserItem}
        refreshControl={
          <RefreshControl onRefresh={atualiza} refreshing={isRefreshing} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listItemContainer: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 20,
  },
  valorTotal: {
    fontSize: 20,
    color: 'green',
  },
});
