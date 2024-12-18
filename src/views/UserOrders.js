import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { API_ENDPOINT } from '../config';



function UserOrdersScreen({ route }) {
  const { idCol } = route.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

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

  const finalizarPedidosPendentes = () => {
    const URL = API_ENDPOINT + 'Pedidos/FinalizarPedidos/' + idCol;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(URL, options)
      .then((response) => response.json())
      .then((data) => {
        // Lide com a resposta do servidor após a finalização dos pedidos
        console.log('Resposta do servidor:', data);

        // Verifique se a resposta foi bem-sucedida
        if (data && data.includes('sucesso')) {
          // Atualize a lista de pedidos
          getUserOrders({ idCol });
        } else {
          console.warn('Erro ao finalizar pedidos:', data);
        }
      })
      .catch((error) => {
        console.error('Erro ao finalizar pedidos:', error);
      });
  };

  const getUserOrders = (colaborador) => {
    console.log('Colaborador:', colaborador);
    const URL = API_ENDPOINT + 'Pedidos/ViewCol/' + colaborador.idCol;

    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(URL, options)
      .then((response) => response.json())
      .then((orderData) => {
        if (orderData && Array.isArray(orderData)) {
          setOrders(orderData);
        } else {
          console.warn('Resposta inesperada da API:', orderData);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    const colaborador = { idCol: idCol }; // substitua isso pelo objeto real do colaborador
    getUserOrders(colaborador);
  }, [idCol]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  
  const renderOrderItem = ({ item: order }) => {   
    return (
      <ListItem  bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Produto: {order.produtoNome}</ListItem.Title>
          <ListItem.Title>Preço: R$ {order.preco}</ListItem.Title>
          <ListItem.Title>Data do Pedido: {formatDate(order.dataPedido)}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          name="delete"
          color="red"
          size={24}
          onPress={() => {
            deleteApi(order)
          }}


        />
      </ListItem>
    );
  };

  const refreshOrders = () => {
    setIsRefreshing(true);
    getUserOrders(idCol);
    setIsRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.idPed}
        renderItem={renderOrderItem}
        refreshControl={<RefreshControl onRefresh={refreshOrders} refreshing={isRefreshing} />}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Altere a cor conforme necessário
    padding: 10,
  },
  finalizarButton: {
    width: 300,
    height: 55,
    backgroundColor: 'red', // Cor do botão para finalizar pedidos
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  finalizarButtonText: {
    color: 'white',
  }
});

export default UserOrdersScreen;
