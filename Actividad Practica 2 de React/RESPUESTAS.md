# Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos
a) **LIFO** (Last In, First Out) significa que el último elemento en entrar es el primero en salir; corresponde a la **pila**. **FIFO** (First In, First Out) significa que el primer elemento en entrar es el primero en salir; corresponde a la **cola**.
b) En una **pila**, los elementos entran y salen por el mismo extremo, llamado tope. En una **cola**, los elementos entran por un extremo (el final) y salen por el opuesto (el frente).
c) **Pila**: En la vida real, una pila de platos para lavar. En una app, el historial de navegación (al tocar "Atrás", se saca la última pantalla visitada).
**Cola**: En la vida real, la fila para pagar en el supermercado. En una app, la cola de descargas o reproducción de música.

### A2. Seguimiento de una pila
(1) Imprime: `'Perfil'`
(2) Imprime: `'Perfil'`
(3) Imprime: `'Productos'`
(4) Imprime: `false`
La pila al final queda (de base a tope): `['Inicio', 'Productos']`

### A3. Seguimiento de una cola
(1) Imprime: `'Beto'`
(2) Imprime: `'Beto'`
(3) Imprime: `false`
La cola al final queda (de frente a final): `['Caro', 'Dani']`

### A4. Análisis de la implementación
a) El `#` declara la propiedad o método como privado en JavaScript. Evita que desde fuera de la clase se modifique directamente el array interno (ej. `cola.#items.push()`), obligando a usar los métodos definidos.
b) `array.shift()` reindexa todos los elementos restantes del array moviéndolos una posición hacia adelante. En colas muy grandes, esto causa problemas de rendimiento (O(n)). Las colas "serias" lo resuelven usando un puntero al índice del frente en lugar de modificar el array, o usando listas enlazadas.
c) La pila usa `pop()` para sacar del final (tope). La cola usa `shift()` para sacar del principio (frente). No pueden usar el mismo porque operan en extremos diferentes por definición (LIFO vs FIFO).

### A5. Programación: una cola eficiente
```javascript
class ColaEficiente {
  #items = {};
  #frente = 0;
  #final = 0;

  encolar(x) {
    this.#items[this.#final] = x;
    this.#final++;
  }

  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frente];
    delete this.#items[this.#frente];
    this.#frente++;
    return elemento;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente === this.#final;
  }

  get tamanio() {
    return this.#final - this.#frente;
  }
}
```

### A6. Pila y cola dentro de Expo Router
a) El historial de pantallas de un Stack se describe con una **pila**. La pantalla visible es la que está en el **tope**. La operación "atrás" hace un **pop** (desapila).
b) Expo Router usa una **cola** interna para las acciones de navegación. Si el usuario toca dos links muy rápido, las acciones se encolan y se procesan una tras otra en el orden en que ocurrieron, evitando inconsistencias o cierres inesperados.

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL
| Archivo | URL que genera / función |
| :--- | :--- |
| `src/app/(tabs)/index.tsx` | `/` (dentro del grupo tabs) |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/[id]` (ruta dinámica, ej. /productos/1) |
| `src/app/docs/[...slug].tsx` | `/docs/*` (catch-all para rutas anidadas, ej. /docs/guia/instalacion) |
| `src/app/_layout.tsx` | No genera pantalla. Es un layout que envuelve las pantallas de ese directorio. |
| `src/app/+not-found.tsx` | No tiene URL propia. Intercepta las rutas no encontradas (error 404). |
| `src/app/Boton.tsx` | **Problema**: generará la ruta `/Boton` si se exporta por defecto un componente, pero no es una convención correcta. Debería estar en una carpeta de componentes, no en `app/`. |

### B2. De la URL al archivo
| URL | Archivo |
| :--- | :--- |
| `/categorias/bebidas` | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso
a) **F** - En Expo Router la configuración se basa en el sistema de archivos (file-based routing), no en tablas de configuración manuales.
b) **F** - Son layouts que envuelven pantallas o definen navegadores, no son visitables por sí solos.
c) **V** - Los paréntesis indican un grupo (Group) que organiza código pero no afecta la URL.
d) **F** - En proyectos Expo conviene usar `npx expo install` para garantizar la compatibilidad de versiones con el SDK actual.
e) **V** - Expo Router usa su propio punto de entrada configurado en package.json.
f) **V** - Es una ruta especial de Expo Router en desarrollo para ver todas las rutas registradas.
g) **F** - Si existen ambos, `docs/index.tsx` captura la URL `/docs` de forma exacta.
h) **V** - A partir de Expo SDK 50+, Expo Router sincronizó sus versiones mayores con el SDK de Expo.

## Parte C · Navegar: <Link>, router y la pila

### C1. Métodos de router
| Método | Qué le hace a la pila |
| :--- | :--- |
| `router.push(href)` | Apila una nueva pantalla encima de la actual. |
| `router.navigate(href)` | Apila si no existe en la pila, o vuelve a ella si ya está en la pila. |
| `router.replace(href)` | Reemplaza la pantalla actual en el tope de la pila por la nueva. |
| `router.back()` | Desapila (elimina) la pantalla del tope, mostrando la anterior. |
| `router.dismissTo(href)` | Desapila pantallas hasta llegar a la ruta especificada. |
| `router.dismissAll()` | Vacía la pila volviendo a la primera pantalla del Stack. |
| `router.canGoBack()` | Retorna `true` si hay al menos una pantalla en la pila debajo de la actual, `false` de lo contrario. No modifica la pila. |
| `router.setParams({...})` | Actualiza los parámetros de la ruta actual sin modificar la estructura de la pila. |

### C2. Simulación de la pila
1. `router.push("/productos/1")` -> `[ /productos, /productos/1 ]`
2. `router.push("/productos/2")` -> `[ /productos, /productos/1, /productos/2 ]`
3. `router.navigate("/productos/5")` -> `[ /productos, /productos/1, /productos/2, /productos/5 ]`
4. `router.push("/perfil")` -> `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]`
5. `router.replace("/buscar")` -> `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]`
6. `router.back()` -> `[ /productos, /productos/1, /productos/2, /productos/5 ]`
7. `router.dismissTo("/productos")` -> `[ /productos ]`
8. `router.canGoBack()` -> devuelve `false` (solo queda la base de la pila).

### C3. ¿Link o router?
a) **`<Link>`**: Es una acción de navegación declarativa, predecible y que debe tener estado de "presionado", ideal para enlaces a otras vistas directas.
b) **`router.replace` o `router.push`**: La navegación depende del resultado lógico asíncrono (respuesta de la API).
c) **`router.back()`**: Es una acción imperativa simple para cerrar/volver.
d) **`router.replace('/principal')`**: Para evitar que el usuario vuelva a la pantalla de login presionando el botón Atrás.
e) **`router.dismissTo('/pedidos')` o `router.navigate`**: Se requiere modificar la pila eliminando pantallas intermedias, no apilar una nueva.

### C4. Escribí el código
a) `<Link href={{ pathname: "/producto/[id]", params: { id: 8 } }}>Ver producto</Link>`
b) `<Link href="/perfil" push>Mi Perfil</Link>`
c) 
```tsx
<Link href="/carrito" asChild>
  <Pressable style={styles.boton}>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar
En web, un `<a href>` permite abrir en pestaña nueva, indexación por SEO y copiar enlace directo. En el celular, aunque no hay barra de direcciones, `<Link>` permite deep linking, mejora la accesibilidad, es interceptable y funciona en Web si el proyecto compila para múltiples plataformas.

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación
| | Stack | Tabs | Drawer |
| :--- | :--- | :--- | :--- |
| ¿Apila pantallas? | Sí | No | No |
| ¿Cómo cambia de pantalla el usuario? | Botones (push) o volver (gesto/atrás) | Tocando la barra inferior | Abriendo el menú lateral |
| ¿Desde dónde se importa en SDK 57? | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Un caso de uso típico | Navegación de un flujo (ej. listado -> detalle) | Secciones principales de la app | Menú lateral para muchas opciones secundarias |

### D2. Cada tab tiene su pila
Ve el detalle del producto 4. Porque las tabs mantienen el estado de su propio Stack anidado. Al cambiar de tab, la pila se pausa, y al volver se restaura exactamente como estaba. Apps como Instagram o Twitter se comportan así.

### D3. ¿Dónde va cada pantalla?
a) Dentro de una tab (para que conviva con la barra de navegación del Tab Stack).
b) Stack raíz (para que su modal/presentation cubra toda la pantalla, incluyendo las tabs).
c) Stack raíz.
d) Dentro de una tab (la tab Perfil tendrá su propio Stack donde se apilará esta pantalla).

### D4. Configurar el Stack
a) `screenOptions` aplica las opciones a **todas** las pantallas del Stack. `options` de `Stack.Screen` aplica solo a esa pantalla en particular y tiene prioridad.
b) Oculta el encabezado nativo del Stack para la ruta `(tabs)`, ya que generalmente las Tabs traen su propio encabezado, evitando así un doble header en pantalla.
c) Sí, existe porque en file-based routing la presencia del archivo crea la ruta automáticamente. Declararla sirve para pasarle opciones de configuración específicas (ej. título, headerShown) si no usamos `router.setParams`.
d) Valores posibles: `'modal'`, `'transparentModal'`, `'containedModal'`, `'formSheet'`, `'card'`, `'fullScreenModal'`. Para una hoja inferior al 50% usaría `'formSheet'` con `sheetAllowedDetents`.
e) Usando el hook `useNavigation` y `setOptions`, o con el componente `<Stack.Screen options={{ title: 'Producto 7' }} />` renderizado dentro de la pantalla del detalle.

### D5. Tabs y Drawer en SDK 57
a) Se importan desde `expo-router/js-tabs` (un tab de JS puro, reescrito).
b) Necesita `react-native-gesture-handler` y `react-native-reanimated`. Se pone `<GestureHandlerRootView style={{ flex: 1 }}>` envolviendo la app en el layout raíz.
c) No, Expo Router ya incluye su propio wrapper/dependencias configuradas con `expo-router/drawer`, aunque internamente lo use. Solo hay que instalar las dependencias de gestos/animaciones.
d) En el Stack más profundo actualmente activo.

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error
Los parámetros dinámicos de URL siempre llegan como strings. `useLocalSearchParams` define el tipo genérico pero eso no cambia el dato real. La comparación estricta `p.id === id` falla porque compara un número con un string.
Corrección:
```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const producto = productos.find((p) => p.id === Number(id)); // o p.id == id
```

### E2. Catch-all
| URL | slug |
| :--- | :--- |
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | Indefinido (a menos que el archivo sea opcional `[[...slug]].tsx`, no matchearía). |

### E3. Anatomía de una URL
a) Scheme: `rutasipf`. Ruta: `/buscar`. Parámetros: `q=mate`, `categoria=bebidas`.
b) Devuelve un objeto: `{ q: 'mate', categoria: 'bebidas' }`.
c) No, `q` es un query param. Los corchetes son para path params (parte de la ruta).
d) 1. Para no ensuciar la pila de navegación con cada letra tipeada. 2. Para mantener el estado actualizable sin recargar la pantalla.

### E4. ¿Dónde estoy?
| Hook | En /productos/3 | En /buscar?q=chipa |
| :--- | :--- | :--- |
| `usePathname()` | `'/productos/3'` | `'/buscar'` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()`| `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local vs global
a) `useLocalSearchParams` devuelve solo los parámetros de la ruta actual. `useGlobalSearchParams` devuelve todos los parámetros activos en cualquier nivel de navegación. La opción por defecto es `useLocalSearchParams` para evitar colisiones si dos pantallas anidadas usan un parámetro con el mismo nombre.
b) Ejecuta un efecto solo cuando la pantalla actual gana foco (se hace visible). Ej: recargar datos del servidor al volver a una pantalla.
c) No es un error de Expo. La ruta `/[id]` existe y recibe cualquier string. Es responsabilidad del desarrollador validar en la pantalla si el parámetro es válido y mostrar contenido adecuado (o redirigir).

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect
a) Redirige inmediatamente al usuario a `/productos` al renderizarse. Equivale a `router.replace('/productos')`.
b) Si usara push (apilar), al presionar "atrás", el usuario volvería a la pantalla que provocó la redirección, la cual volvería a redirigirlo hacia adelante, creando un bucle del que no puede salir.

### F2. Stack.Protected
```tsx
 <Stack.Protected guard={ conSesion }>
 ...
 <Stack.Protected guard={ !conSesion }>
```
a) No se renderiza su contenido ni forma parte de las rutas disponibles (su acceso está protegido/oculto).
b) Porque al cambiar el estado de sesión, la condición de protección de la pantalla login se vuelve falsa, por lo que el Stack desmonta/saca la pantalla automáticamente del historial.
c) Pasa cuando intentas navegar a una ruta que no está montada (ej. `router.navigate('privado')` estando deslogueado). Se evita revisando la lógica o usando `<Redirect>` si se detecta estado inválido.
d) Es declarativo a nivel del router. Limpia la pantalla de la pila en lugar de renderizarla y luego redirigir, evitando destellos de la interfaz.

### F3. 404, anchor y rutas tipadas
a) Archivo especial que intercepta cualquier URL que no coincida con rutas existentes, mostrando un error. Se define en la raíz `src/app/`.
b) Define qué grupo debe ser la raíz cuando un deep link invoca una pantalla anidada, para que las pestañas sigan visibles y el layout base se aplique. Se define en layouts, ej. `src/app/_layout.tsx` o `src/app/(tabs)/_layout.tsx`.
c) TypeScript dará un error de compilación indicando que `/prodcutos` no es una ruta válida. Los tipos se generan automáticamente al ejecutar Expo, guardados en una carpeta `.expo/types/`.

### F4. Deep links
| Dónde | URL |
| :--- | :--- |
| App instalada | `comedoripf://menu/7` |
| Expo Go | `exp://192.168.1.20:8081/--/menu/7` |
| Web | `http://localhost:8081/menu/7` |
La parte `/--/` le indica a Expo Go que ahí termina la configuración propia y empieza el path de la aplicación cargada. El scheme propio (`comedoripf`) no funciona en Expo Go porque Expo Go es una app que maneja su propio scheme (`exp://`).

### F5. Errores comunes
a) Causa: `Link` con `asChild` pasa props a su hijo, y `Pressable` con un array de estilos puede dar problemas si no está correctamente integrado o si la versión requiere pasar `style` de otra forma. Solución: Usar un componente intermedio o no usar `asChild`, o resolver el estilo fuera del componente Slot del enlace.
b) Causa: Todo archivo en `src/app` es considerado ruta. Solución: Moverlo a `src/components/`.
c) Causa: `router.push("/")` apiló el inicio sobre el login. Solución: Usar `router.replace("/")` para cambiar la raíz sin apilar.
d) Causa: `npm install` puede instalar versiones incompatibles. Solución: Usar siempre `npx expo install <paquete>` para alinear versiones.
