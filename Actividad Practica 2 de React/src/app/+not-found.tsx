import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta pantalla no existe.</Text>
      <Link href="/" style={styles.link}>Volver al inicio</Link>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 20, fontWeight: 'bold' }, link: { marginTop: 15, paddingVertical: 15, color: 'blue' } });
