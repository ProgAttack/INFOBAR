// OrdersListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API_ENDPOINT } from '../config';

const OrdersListScreen = ({ route }) => {
  const { idCol, userName } = route.params; // Correção: userId para idCol
  const [orders, setOrders] = useState([]);

  const getOrdersForUser = () => {
    const URL = API_ENDPOINT + `Pedidos/ViewCol/${idCol}`; // Correção: userId para idCol

    fetch(URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
        return response.json();
      })
      .then((dadosEnvio) => {
        setOrders(dadosEnvio);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOrdersForUser();
  }, []);

  function getOrderItem({ item: order }) {
    return (
      <View>
        <Text>{order.nomeProduto}</Text>
        <Text>R$ {order.valor}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Pedidos para {userName}</Text>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.idPedido.toString()}
        renderItem={getOrderItem}
      />
    </View>
  );
};

export default OrdersListScreen;
