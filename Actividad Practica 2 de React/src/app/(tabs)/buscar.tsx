import { View, Text, TextInput, StyleSheet } from 'react-native';
// DondeEstoy removed – not needed

export default function BuscarScreen() {
  return (
    <View style={styles.container}>
      <Text>Buscar Platos</Text>
      <TextInput style={styles.input} placeholder="Buscar..." />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 } });
