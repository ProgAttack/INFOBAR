import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { Button, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export default props => {
  const [quantidades, setQuantidades] = useState({}); // Um objeto para rastrear as quantidades dos produtos

  const inc = produto => {
    setQuantidades(prevQuantidades => ({
      ...prevQuantidades,
      [produto.prod_id]: (prevQuantidades[produto.prod_id] || 0) + 1,
    }));
  };

  const dec = produto => {
    if (quantidades[produto.prod_id] > 0) {
      setQuantidades(prevQuantidades => ({
        ...prevQuantidades,
        [produto.prod_id]: (prevQuantidades[produto.prod_id] || 0) - 1,
      }));
    }
  };

  function getProductsItem({ item: produto }) {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.titulo}>{produto.prod_nome}</ListItem.Title>
        </ListItem.Content>
        <View style={styles.formatacao}>
          <Button title="+" onPress={() => inc(produto)} />
          <Text>{quantidades[produto.prod_id] || 0}</Text>
          <Button title="-" onPress={() => dec(produto)} />
        </View>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={produto => produto.prod_id.toString()}
        data={Products}
        renderItem={getProductsItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  formatacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
