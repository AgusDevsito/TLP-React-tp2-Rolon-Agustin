import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalContext';


export default function ConfirmarScreen() {
  const { nota } = useLocalSearchParams();
  const { crearPedido } = useGlobalContext();

  const handleConfirmar = () => {
    const id = crearPedido((nota as string) || '');
    router.replace(`/turno/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Pedido</Text>
      <Text>Nota: {nota}</Text>
      <Button title="Confirmar y Enviar" onPress={handleConfirmar} />

    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 } });
