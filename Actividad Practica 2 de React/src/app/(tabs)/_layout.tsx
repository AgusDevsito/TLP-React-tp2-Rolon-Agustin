import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="menu/index" options={{ title: 'Menú', tabBarIcon: ({color}) => <Ionicons name="restaurant" size={24} color={color} /> }} />
      <Tabs.Screen name="buscar" options={{ title: 'Buscar', tabBarIcon: ({color}) => <Ionicons name="search" size={24} color={color} /> }} />
      <Tabs.Screen name="carrito/index" options={{ title: 'Carrito', tabBarIcon: ({color}) => <Ionicons name="cart" size={24} color={color} /> }} />
    </Tabs>
  );
}
