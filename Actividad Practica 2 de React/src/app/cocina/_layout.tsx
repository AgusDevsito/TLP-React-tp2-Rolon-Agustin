import { Drawer } from 'expo-router/drawer';

export default function CocinaLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ drawerLabel: 'Pendientes', title: 'Pedidos Pendientes' }} />
      <Drawer.Screen name="atendidos" options={{ drawerLabel: 'Atendidos', title: 'Pedidos Atendidos' }} />
    </Drawer>
  );
}
