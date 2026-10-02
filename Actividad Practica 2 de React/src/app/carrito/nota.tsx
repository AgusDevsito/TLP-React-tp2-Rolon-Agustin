import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
// DondeEstoy removed – not needed

export default function NotaScreen() {
  const [nota, setNota] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nota al Pedido</Text>
      <TextInput style={styles.input} value={nota} onChangeText={setNota} placeholder="Ej: Sin sal" />
      <Button title="Confirmar Pedido" onPress={() => router.push({ pathname: '/confirmar', params: { nota } })} />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 20, marginBottom: 10 }, input: { borderWidth: 1, padding: 10, marginBottom: 10 } });
