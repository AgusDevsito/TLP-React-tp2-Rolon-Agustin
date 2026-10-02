import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { platos } from '../../data/platos';
// DondeEstoy removed – not needed

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams();
  const platosCategoria = platos.filter(p => p.categoria === categoria);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoría: {categoria}</Text>
      <FlatList 
        data={platosCategoria}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text style={styles.item}>{item.nombre}</Text>}
      />
// DondeEstoy removed – not needed
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
