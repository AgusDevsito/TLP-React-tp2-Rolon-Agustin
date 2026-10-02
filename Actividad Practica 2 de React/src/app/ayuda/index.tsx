import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
// DondeEstoy removed – not needed

export default function AyudaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sección de Ayuda</Text>
      <Button title="Ver Tema 1" onPress={() => router.push('/ayuda/tema1')} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 } });
