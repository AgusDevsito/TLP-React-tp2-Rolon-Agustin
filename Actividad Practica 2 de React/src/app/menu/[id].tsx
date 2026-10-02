import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { platos } from '../../data/platos';
import { useGlobalContext } from '../../context/GlobalContext';
// DondeEstoy removed – not needed

export default function PlatoDetalle() {
  const { id } = useLocalSearchParams();
  const { agregarAlCarrito } = useGlobalContext();
  const plato = platos.find(p => p.id === id);

  if (!plato) return <View><Text>Plato no encontrado</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.nombre}</Text>
      <Text>{plato.descripcion}</Text>
      <Text>Precio: $${plato.precio}</Text>
      <Button title="Agregar al Carrito" onPress={() => { agregarAlCarrito(plato); router.push('/carrito'); }} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, fontWeight: 'bold' } });
