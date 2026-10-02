import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalContext';
// DondeEstoy removed – not needed

export default function CarritoScreen() {
  const { accionesCarrito, deshacerAccionCarrito } = useGlobalContext();
  const arr = accionesCarrito.aArray().filter(a => a.tipo === 'AGREGAR').map(a => a.plato);
  const total = arr.reduce((acc, p) => acc + p.precio, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito ({accionesCarrito.tamanio} acciones)</Text>
      <FlatList 
        data={arr}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => <Text style={styles.item}>{item.nombre} - $${item.precio}</Text>}
      />
      <Text style={styles.total}>Total: $${total}</Text>
      <Button title="Deshacer Última Acción" onPress={deshacerAccionCarrito} />
      <Button title="Proceder (Agregar Nota)" onPress={() => router.push('/carrito/nota')} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10 }, total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 } });
