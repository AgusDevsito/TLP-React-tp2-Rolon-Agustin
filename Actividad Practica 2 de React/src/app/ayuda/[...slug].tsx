import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// DondeEstoy removed – not needed

export default function AyudaSlugScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Ayuda</Text>
      <Text>Path: {JSON.stringify(slug)}</Text>
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 } });
