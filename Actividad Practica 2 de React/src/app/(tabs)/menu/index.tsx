import { View, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { platos } from '../../../data/platos';
import Card from '../../../components/Card';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={platos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.nombre}
            description={item.descripcion}
            price={item.precio}
            image={item.imagen}
            onPress={() => router.push(`/menu/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});
