const fs = require('fs');
const path = require('path');

const dirs = [
  'src/estructuras',
  'src/data',
  'src/context',
  'src/components',
  'src/app',
  'src/app/(tabs)',
  'src/app/categorias',
  'src/app/menu',
  'src/app/carrito',
  'src/app/turno',
  'src/app/cocina',
  'src/app/ayuda'
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const files = {
  'src/estructuras/Pila.ts': `export class Pila<T> {
  #items: T[] = [];
  
  apilar(elemento: T): void {
    this.#items.push(elemento);
  }
  
  desapilar(): T | undefined {
    return this.#items.pop();
  }
  
  verTope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }
  
  estaVacia(): boolean {
    return this.#items.length === 0;
  }
  
  vaciar(): void {
    this.#items = [];
  }
  
  get tamanio(): number {
    return this.#items.length;
  }
  
  aArray(): T[] {
    return [...this.#items].reverse();
  }
}
`,
  'src/estructuras/Cola.ts': `export class Cola<T> {
  #items: T[] = [];
  
  encolar(elemento: T): void {
    this.#items.push(elemento);
  }
  
  desencolar(): T | undefined {
    return this.#items.shift();
  }
  
  verFrente(): T | undefined {
    return this.#items[0];
  }
  
  estaVacia(): boolean {
    return this.#items.length === 0;
  }
  
  vaciar(): void {
    this.#items = [];
  }
  
  get tamanio(): number {
    return this.#items.length;
  }
  
  aArray(): T[] {
    return [...this.#items];
  }
}
`,
  'src/data/platos.ts': `export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Principal' | 'Postre' | 'Bebida';
}

export const platos: Plato[] = [
  { id: '1', nombre: 'Milanesa con fritas', descripcion: 'Clásica', precio: 5000, categoria: 'Principal' },
  { id: '2', nombre: 'Sorrentinos de JyQ', descripcion: 'Con salsa fileto', precio: 4500, categoria: 'Principal' },
  { id: '3', nombre: 'Hamburguesa Completa', descripcion: 'Con queso, jamón, huevo, tomate y lechuga', precio: 4000, categoria: 'Principal' },
  { id: '4', nombre: 'Pizza Muzza', descripcion: '8 porciones', precio: 4000, categoria: 'Principal' },
  { id: '5', nombre: 'Ensalada Caesar', descripcion: 'Lechuga, pollo, croutons, aderezo', precio: 3500, categoria: 'Principal' },
  { id: '6', nombre: 'Tarta de JyQ', descripcion: 'Porción', precio: 2000, categoria: 'Principal' },
  { id: '7', nombre: 'Flan con DDl', descripcion: 'Casero', precio: 1500, categoria: 'Postre' },
  { id: '8', nombre: 'Helado', descripcion: '2 bochas', precio: 1200, categoria: 'Postre' },
  { id: '9', nombre: 'Ensalada de Frutas', descripcion: 'Fresco', precio: 1000, categoria: 'Postre' },
  { id: '10', nombre: 'Coca Cola', descripcion: 'Lata 354ml', precio: 800, categoria: 'Bebida' },
  { id: '11', nombre: 'Agua Mineral', descripcion: '500ml', precio: 600, categoria: 'Bebida' },
  { id: '12', nombre: 'Cerveza', descripcion: 'Lata 473ml', precio: 1200, categoria: 'Bebida' }
];
`,
  'src/context/GlobalContext.tsx': `import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pila } from '../estructuras/Pila';
import { Cola } from '../estructuras/Cola';
import { Plato } from '../data/platos';

export interface AccionCarrito {
  tipo: 'AGREGAR' | 'ELIMINAR';
  plato: Plato;
  fecha: Date;
}

export interface Pedido {
  id: string;
  items: Plato[];
  total: number;
  nota: string;
  estado: 'Pendiente' | 'Listo';
  usuario: string;
}

interface GlobalContextType {
  usuario: string | null;
  setUsuario: (u: string | null) => void;
  accionesCarrito: Pila<AccionCarrito>;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerAccionCarrito: () => void;
  vaciarCarrito: () => void;
  pedidosPendientes: Cola<Pedido>;
  pedidosAtendidos: Pila<Pedido>;
  crearPedido: (nota: string) => string;
  atenderSiguientePedido: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<string | null>(null);
  
  const [accionesCarrito] = useState(new Pila<AccionCarrito>());
  const [pedidosPendientes] = useState(new Cola<Pedido>());
  const [pedidosAtendidos] = useState(new Pila<Pedido>());
  
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);

  const agregarAlCarrito = (plato: Plato) => {
    accionesCarrito.apilar({ tipo: 'AGREGAR', plato, fecha: new Date() });
    forceUpdate();
  };

  const deshacerAccionCarrito = () => {
    accionesCarrito.desapilar();
    forceUpdate();
  };
  
  const vaciarCarrito = () => {
    accionesCarrito.vaciar();
    forceUpdate();
  };

  const crearPedido = (nota: string) => {
    const arr = accionesCarrito.aArray();
    const items = arr.filter(a => a.tipo === 'AGREGAR').map(a => a.plato);
    const total = items.reduce((acc, p) => acc + p.precio, 0);
    const id = Math.floor(Math.random() * 1000).toString();
    const pedido: Pedido = {
      id, items, total, nota, estado: 'Pendiente', usuario: usuario || 'Anonimo'
    };
    pedidosPendientes.encolar(pedido);
    accionesCarrito.vaciar();
    forceUpdate();
    return id;
  };

  const atenderSiguientePedido = () => {
    const pedido = pedidosPendientes.desencolar();
    if (pedido) {
      pedido.estado = 'Listo';
      pedidosAtendidos.apilar(pedido);
      forceUpdate();
    }
  };

  return (
    <GlobalContext.Provider value={{
      usuario, setUsuario,
      accionesCarrito, agregarAlCarrito, deshacerAccionCarrito, vaciarCarrito,
      pedidosPendientes, pedidosAtendidos, crearPedido, atenderSiguientePedido
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
`,
  'src/components/DondeEstoy.tsx': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Dónde Estoy</Text>
      <Text>Pathname: {pathname}</Text>
      <Text>Segments: {JSON.stringify(segments)}</Text>
      <Text>Params: {JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
  }
});
`,
  'src/app/_layout.tsx': `import { Stack } from 'expo-router';
import { GlobalProvider } from '../context/GlobalContext';

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />
      </Stack>
    </GlobalProvider>
  );
}
`,
  'src/app/(tabs)/_layout.tsx': `import { Tabs } from 'expo-router';
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
`,
  'src/app/(tabs)/index.tsx': `import { View, Text, Button, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import DondeEstoy from '../../components/DondeEstoy';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Comedor IPF</Text>
      <Button title="Ir al Menú" onPress={() => router.push('/menu')} />
      <Button title="Ver Categorías" onPress={() => router.push('/categorias/Principal')} />
      <Button title="Cocina (Drawer)" onPress={() => router.push('/cocina')} />
      <Button title="Iniciar Sesión" onPress={() => router.push('/login')} />
      <Button title="Ayuda" onPress={() => router.push('/ayuda')} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 20 } });
`,
  'src/app/(tabs)/menu/index.tsx': `import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { platos } from '../../../data/platos';
import DondeEstoy from '../../../components/DondeEstoy';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={platos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => router.push(\`/menu/\${item.id}\`)}>
            <Text>{item.nombre} - $\${item.precio}</Text>
          </TouchableOpacity>
        )}
      />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 10 }, item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' } });
`,
  'src/app/menu/[id].tsx': `import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { platos } from '../../data/platos';
import { useGlobalContext } from '../../context/GlobalContext';
import DondeEstoy from '../../components/DondeEstoy';

export default function PlatoDetalle() {
  const { id } = useLocalSearchParams();
  const { agregarAlCarrito } = useGlobalContext();
  const plato = platos.find(p => p.id === id);

  if (!plato) return <View><Text>Plato no encontrado</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.nombre}</Text>
      <Text>{plato.descripcion}</Text>
      <Text>Precio: $\${plato.precio}</Text>
      <Button title="Agregar al Carrito" onPress={() => { agregarAlCarrito(plato); router.push('/carrito'); }} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, fontWeight: 'bold' } });
`,
  'src/app/categorias/[categoria].tsx': `import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { platos } from '../../data/platos';
import DondeEstoy from '../../components/DondeEstoy';

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
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
`,
  'src/app/(tabs)/buscar.tsx': `import { View, Text, TextInput, StyleSheet } from 'react-native';
import DondeEstoy from '../../components/DondeEstoy';

export default function BuscarScreen() {
  return (
    <View style={styles.container}>
      <Text>Buscar Platos</Text>
      <TextInput style={styles.input} placeholder="Buscar..." />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 } });
`,
  'src/app/(tabs)/carrito/index.tsx': `import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalContext';
import DondeEstoy from '../../../components/DondeEstoy';

export default function CarritoScreen() {
  const { accionesCarrito, deshacerAccionCarrito } = useGlobalContext();
  const arr = accionesCarrito.aArray().filter(a => a.tipo === 'AGREGAR').map(a => a.plato);
  const total = arr.reduce((acc, p) => acc + p.precio, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito ({accionesCarrito.tamanio} acciones)</Text>
      <FlatList 
        data={arr}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => <Text style={styles.item}>{item.nombre} - $\${item.precio}</Text>}
      />
      <Text style={styles.total}>Total: $\${total}</Text>
      <Button title="Deshacer Última Acción" onPress={deshacerAccionCarrito} />
      <Button title="Proceder (Agregar Nota)" onPress={() => router.push('/carrito/nota')} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10 }, total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 } });
`,
  'src/app/carrito/nota.tsx': `import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import DondeEstoy from '../../components/DondeEstoy';

export default function NotaScreen() {
  const [nota, setNota] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nota al Pedido</Text>
      <TextInput style={styles.input} value={nota} onChangeText={setNota} placeholder="Ej: Sin sal" />
      <Button title="Confirmar Pedido" onPress={() => router.push({ pathname: '/confirmar', params: { nota } })} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 20, marginBottom: 10 }, input: { borderWidth: 1, padding: 10, marginBottom: 10 } });
`,
  'src/app/confirmar.tsx': `import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalContext';
import DondeEstoy from '../components/DondeEstoy';

export default function ConfirmarScreen() {
  const { nota } = useLocalSearchParams();
  const { crearPedido } = useGlobalContext();

  const handleConfirmar = () => {
    const id = crearPedido((nota as string) || '');
    router.replace(\`/turno/\${id}\`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Pedido</Text>
      <Text>Nota: {nota}</Text>
      <Button title="Confirmar y Enviar" onPress={handleConfirmar} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 } });
`,
  'src/app/turno/[numero].tsx': `import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import DondeEstoy from '../../components/DondeEstoy';

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu turno es el: {numero}</Text>
      <Button title="Volver al Inicio" onPress={() => router.push('/')} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, alignItems: 'center' }, title: { fontSize: 32, marginBottom: 20 } });
`,
  'src/app/login.tsx': `import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalContext';
import DondeEstoy from '../components/DondeEstoy';

export default function LoginScreen() {
  const [nombre, setNombre] = useState('');
  const { setUsuario } = useGlobalContext();

  const handleLogin = () => {
    setUsuario(nombre);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre de usuario" />
      <Button title="Ingresar" onPress={handleLogin} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, input: { borderWidth: 1, padding: 10, marginBottom: 10 } });
`,
  'src/app/cocina/_layout.tsx': `import { Drawer } from 'expo-router/drawer';

export default function CocinaLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ drawerLabel: 'Pendientes', title: 'Pedidos Pendientes' }} />
      <Drawer.Screen name="atendidos" options={{ drawerLabel: 'Atendidos', title: 'Pedidos Atendidos' }} />
    </Drawer>
  );
}
`,
  'src/app/cocina/index.tsx': `import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import DondeEstoy from '../../components/DondeEstoy';

export default function CocinaPendientes() {
  const { pedidosPendientes, atenderSiguientePedido } = useGlobalContext();
  const arr = pedidosPendientes.aArray();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pendientes ({pedidosPendientes.tamanio})</Text>
      <FlatList 
        data={arr}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Pedido: #{item.id} - Total: $\${item.total}</Text>
            <Text>Nota: {item.nota}</Text>
          </View>
        )}
      />
      <Button title="Atender Siguiente" onPress={atenderSiguientePedido} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
`,
  'src/app/cocina/atendidos.tsx': `import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import DondeEstoy from '../../components/DondeEstoy';

export default function CocinaAtendidos() {
  const { pedidosAtendidos } = useGlobalContext();
  const arr = pedidosAtendidos.aArray();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atendidos ({pedidosAtendidos.tamanio})</Text>
      <FlatList 
        data={arr}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Pedido: #{item.id} - Total: $\${item.total}</Text>
          </View>
        )}
      />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 }, item: { padding: 10, borderBottomWidth: 1 } });
`,
  'src/app/ayuda/index.tsx': `import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import DondeEstoy from '../../components/DondeEstoy';

export default function AyudaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sección de Ayuda</Text>
      <Button title="Ver Tema 1" onPress={() => router.push('/ayuda/tema1')} />
      <DondeEstoy />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 24, marginBottom: 10 } });
`,
  'src/app/ayuda/[...slug].tsx': `import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DondeEstoy from '../../components/DondeEstoy';

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
`,
  'src/app/pedido.tsx': `import { Redirect } from 'expo-router';

export default function PedidoRedirect() {
  return <Redirect href="/carrito" />;
}
`,
  'src/app/+not-found.tsx': `import { View, Text, StyleSheet } from 'react-native';
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
`,
  'README.md': `# Comedor IPF - Actividad Práctica 2 de React

Aplicación móvil desarrollada con Expo y React Native utilizando Expo Router.
Cumple con la estructura de rutas, contextos globales y el uso de estructuras de datos (Pila y Cola).

## Ejecución

- \`npm install\` o \`bun install\`
- \`npx expo start\`

## Rutas
- \`/\` - Inicio
- \`/menu\` - Listado de menú
- \`/menu/[id]\` - Detalle de plato
- \`/carrito\` - Carrito
- \`/cocina\` - Drawer de cocina
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content);
}

console.log('Done generating files');
