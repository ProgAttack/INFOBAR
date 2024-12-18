import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList, Alert, RefreshControl, StyleSheet,TouchableOpacity  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { API_ENDPOINT } from '../config';
import UserContext from '../context/UserContext';

export default (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();

  const [dados, setDados] = useState([]);

  const getPedido = () => {
    const URL = API_ENDPOINT + 'Pedidos/ViewCol/' + state.colaborador.idCol;

    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(URL, options)
      .then((response) => response.json())
      .then((dadosResposta) => {
        if (dadosResposta && Array.isArray(dadosResposta)) {
          setDados(dadosResposta);
          getPedido();
        } else {
          console.warn('Resposta inesperada da API:', dadosResposta);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao obter os pedidos.');
      })
      .finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    getPedido();
  }, []);

  const deleteApi = async (pedido) => {
    const URL = API_ENDPOINT + 'Pedidos/DeletePedido/' + pedido.idPed;

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
      .then(() => {
        Alert.alert(
          'Exclusão!',
          'Pedido excluído com sucesso!',
          [
            {
              text: 'Ok',
            },
          ]
        );
        getPedido();
      })
      .catch((error) => {
        console.error('Erro: ', error);
      });
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const getUserItem = ({ item: pedido }) => (
    <ListItem  bottomDivider>
      <ListItem.Content >
        <ListItem.Title style={style.titulo}>{pedido.produtoNome}</ListItem.Title>
        <ListItem.Title style={style.subtitulo}>
          R$ {pedido.preco.toFixed(2)} - Data: {formatDate(pedido.dataPedido)}
        </ListItem.Title>
      </ListItem.Content>

      
      
    </ListItem>
  );
  
  const atualiza = async () => {
    setIsRefreshing(true);
    try {
      await getPedido();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={style.container}>
      <FlatList
        data={dados}
        keyExtractor={(pedido) => pedido.idPed} 
        renderItem={getUserItem}
        refreshControl={<RefreshControl onRefresh={atualiza} refreshing={isRefreshing} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192B4C',
  },
  subtitulo: {
    fontSize: 18
  },
  titulo:{
    fontSize: 18
  }
});
