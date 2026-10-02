import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalContext';
import { Colors } from '../../constants/theme';

export default function Home() {
  const { usuario } = useGlobalContext();

  return (
    <View style={styles.container}>
      {usuario ? (
        <View style={styles.profileBanner}>
          <Text style={styles.profileText}>Alumno del IPF - {usuario}</Text>
        </View>
      ) : null}
      
      <Text style={styles.title}>Comedor IPF</Text>
      
      <Pressable style={[styles.button, { backgroundColor: Colors.light.primary }]} onPress={() => router.push('/menu')}>
        <Text style={styles.buttonText}>Ver Menú</Text>
      </Pressable>
      
      <Pressable style={[styles.button, { backgroundColor: Colors.light.accent }]} onPress={() => router.push('/cocina')}>
        <Text style={styles.buttonText}>Cocina (Drawer)</Text>
      </Pressable>
      
      {!usuario && (
        <Pressable style={[styles.button, { backgroundColor: Colors.light.primaryDark }]} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.background },
  title: { fontSize: 32, marginBottom: 30, fontWeight: 'bold', color: Colors.light.primaryDark },
  profileBanner: {
    position: 'absolute',
    top: 40,
    backgroundColor: Colors.light.accentLight,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
