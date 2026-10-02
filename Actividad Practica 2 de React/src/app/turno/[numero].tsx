import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
// DondeEstoy removed – not needed

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu turno es el: {numero}</Text>
      <Button title="Volver al Inicio" onPress={() => router.push('/')} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, alignItems: 'center' }, title: { fontSize: 32, marginBottom: 20 } });
