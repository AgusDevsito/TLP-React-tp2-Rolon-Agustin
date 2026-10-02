import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
// DondeEstoy removed – not needed

export default function CocinaAtendidos() {
  const { pedidosAtendidos } = useGlobalContext();
  const arr = pedidosAtendidos.aArray();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atendidos ({pedidosAtendidos.tamanio})</Text>
      <FlatList 
        data={arr}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Pedido: #{item.id} - Total: $${item.total}</Text>
          </View>
        )}
      />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
