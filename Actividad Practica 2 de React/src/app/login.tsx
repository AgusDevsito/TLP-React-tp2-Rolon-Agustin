import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalContext';
import { Colors } from '../constants/theme';

export default function LoginScreen() {
  const [nombre, setNombre] = useState('');
  const { setUsuario } = useGlobalContext();

  const handleLogin = () => {
    if (nombre.trim() !== '') {
      setUsuario(nombre);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput 
        style={styles.input} 
        value={nombre} 
        onChangeText={setNombre} 
        placeholder="Nombre de usuario" 
        placeholderTextColor={Colors.light.textSecondary}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
         <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: Colors.light.background
  }, 
  title: { 
    fontSize: 28, 
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.light.primaryDark
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: Colors.light.primary,
    backgroundColor: '#fff',
    padding: 15, 
    marginBottom: 20,
    width: '90%',
    borderRadius: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
