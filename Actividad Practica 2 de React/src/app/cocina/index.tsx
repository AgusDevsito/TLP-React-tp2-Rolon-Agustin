import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
// DondeEstoy removed – not needed

export default function CocinaPendientes() {
  const { pedidosPendientes, atenderSiguientePedido } = useGlobalContext();
  const arr = pedidosPendientes.aArray();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pendientes ({pedidosPendientes.tamanio})</Text>
      <FlatList 
        data={arr}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Pedido: #{item.id} - Total: $${item.total}</Text>
            <Text>Nota: {item.nota}</Text>
          </View>
        )}
      />
      <Button title="Atender Siguiente" onPress={atenderSiguientePedido} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
