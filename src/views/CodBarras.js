import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { API_ENDPOINT } from '../config';
import UserContext from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default ({ route, navigation }) => {
  const { state } = useContext(UserContext);
  const [pedido, setPedido] = useState(route.params ? route.params : {});
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Carregar a lista de produtos ao inicializar
    fetchProdutos();
  }, []);
  
  const fetchProdutos = async () => {
    const URL = API_ENDPOINT + 'Produtos/';
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar produtos');
      }
      const produtos = await response.json();
      setProdutos(produtos);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar a lista de produtos.');
    }
  };

  const fazerPedido = async (produtoNoBanco) => {
    console.log('Iniciando fazerPedido...');
    console.log('Dados do Pedido:', pedido);
    console.log('Dados do Produto no Banco:', produtoNoBanco);

    
    const dataPedidoAtual = new Date().toISOString();
    const dadosEnvio = {
      DataPedido: dataPedidoAtual,
      IdColaborador: state.colaborador.idCol, // Certifique-se de usar a propriedade correta do objeto pedido
      IdProduto: produtoNoBanco.idProd, // Use a propriedade correta do objeto produtoNoBanco
    };
    console.log("DADOS ENVIO UNDEFIED", dadosEnvio)
    const URL = API_ENDPOINT + 'Pedidos/AddPedido/';
  
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosEnvio),
    };
  
    setLoading(true);
  
    try {
      const response = await fetch(URL, options);
      console.log('Resposta do Servidor após POST:', response);
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Conteúdo do Erro:', errorMessage);
        throw new Error('A solicitação falhou');
      }
  
      const dadosResposta = await response.json();
      console.log('Resposta do servidor (JSON):', dadosResposta);

      setPedido(dadosResposta)
  
      // Navegue para a tela apropriada após o pedido ser concluído com sucesso
      navigation.navigate('PedidosList');
    } catch (error) {
      console.error('Erro ao fazer pedido:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o pedido.');
    } finally {
      setLoading(false);
    }
  };
  
  const buscaProduto = async () => {
    const URL = API_ENDPOINT + 'Pedidos/CodBarrasConfirma/' + pedido.codBarras;
  
    try {
      const response = await fetch(URL);
  
      if (!response.ok) {
        throw new Error('A solicitação falhou');
      }
  
      const produtoNoBanco = await response.json();
      console.log('Resposta da API:', produtoNoBanco);
  
      if (produtoNoBanco && produtoNoBanco.nomeProd && produtoNoBanco.preco) {
        Alert.alert(
          'Confirmar produto',
          `Esse é o produto que você escolheu?\nNome: ${produtoNoBanco.nomeProd}\nPreço: R$ ${produtoNoBanco.preco}`,
          [
            {
              text: 'Sim',
              onPress: () => fazerPedido(produtoNoBanco),
            },
            {
              text: 'Não',
            },
          ]
        );
      } else {
        Alert.alert('Produto não encontrado', 'O produto associado ao código de barras não foi encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o produto no banco de dados.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Selecionar produto:</Text>
        <SelectDropdown
          dropdownStyle={styles.dropdownStyle}
          data={produtos}
          onSelect={(selectedItem, index) => {
            // Atualiza o estado do pedido com o id e nome do produto selecionado e também o código de barras
            setPedido({
              ...pedido,
              idProduto: selectedItem.idProd,
              nomeProduto: selectedItem.nomeProd,
              codBarras: selectedItem.codBarras // Certifique-se de que o objeto produto tem uma propriedade 'codBarras'
            });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.nomeProd;
          }}
          rowTextForSelection={(item, index) => {
            return `${item.nomeProd} - R$ ${item.preco}`;
          }}
          defaultButtonText="Selecione um produto"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          renderDropdownIcon={isOpened => <Text style={styles.dropdownIcon}>{isOpened ? '▲' : '▼'}</Text>}
          dropdownIconPosition="right"
        />
  
        <Text style={styles.label}>Código do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(codBarras) => setPedido({ ...pedido, codBarras })}
          placeholder="Digite o código do produto"
          value={pedido.codBarras} // O valor é vinculado ao estado do pedido
        />
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            buscaProduto();
          }}
        >
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>
  
        {loading && <ActivityIndicator style={styles.loading} />}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  dropdownButton: {
    width: '100%',
    height: 50, // Aumentar a altura para melhor toque
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3498db',
    marginBottom: 20,
  },
  dropdownButtonText: {
    textAlign: 'left',
    fontSize: 18,
    color: '#192B4C',
  },
  dropdownIcon: {
    fontSize: 20,
    color: '#192B4C',
  },
  // ...outros estilos

  container: {
    flex: 1,
    paddingTop: 8, // Mudança de 'padding' para 'paddingTop' para alinhar ao topo
    alignItems: 'center',
    backgroundColor: '#192B4C', // cor dark 
    
  },
  form: {
    width: '95%', // Aumentar para ocupar mais espaço
    backgroundColor: '#fff', // cor branca para o formulário
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#192B4C', // cor da borda das inputs
    elevation: 5,
    alignItems: 'stretch', // Adicionado para esticar os filhos
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#192B4C', // cor dark 
    borderRadius: 10
  },
  input: {
    padding: 10,
    fontSize: 18,
    height: 40,
    borderColor: '#3498db', // azul 
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    color: '#192B4C', // cor dark 
  },
  button: {
    backgroundColor: '#4CAF50', // verde 
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 10,
  },
    // Estilos para a lista do dropdown
    dropdownStyle: {
      backgroundColor: '#FFF',
      borderRadius: 10,
    },
    dropdownRow: {
      flexDirection: 'column', // Itens dispostos em coluna para que o nome e o preço estejam em linhas separadas
      justifyContent: 'center', // Centraliza o conteúdo verticalmente
      alignItems: 'flex-start', // Alinha o texto à esquerda
      padding: 10, // Ajustar o padding conforme necessário
      borderBottomColor: '#CCC',
      borderBottomWidth: 1,
      borderRadius: 16
    },
    dropdownRowText: {
      fontSize: 12,
      color: '#192B4C',
      textAlign: 'left',
      flexWrap: 'wrap' // Permitir que o texto ocupe todo o espaço disponível
    },
  
});
