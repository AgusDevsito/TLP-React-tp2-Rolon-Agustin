// Plato data with optional image URLs
export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Principal' | 'Postre' | 'Bebida';
  imagen?: string; // remote image URL
}

export const platos: Plato[] = [
  {
    id: '1',
    nombre: 'Milanesa con fritas',
    descripcion: 'Clásica',
    precio: 5000,
    categoria: 'Principal',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Milanesa_con_fritas.png',
  },
  {
    id: '2',
    nombre: 'Sorrentinos de JyQ',
    descripcion: 'Con salsa fileto',
    precio: 4500,
    categoria: 'Principal',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Sorrentinos.jpg',
  },
  {
    id: '3',
    nombre: 'Hamburguesa Completa',
    descripcion: 'Con queso, jamón, huevo, tomate y lechuga',
    precio: 4000,
    categoria: 'Principal',
    imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },
  {
    id: '4',
    nombre: 'Pizza Muzza',
    descripcion: '8 porciones',
    precio: 4000,
    categoria: 'Principal',
    imagen: 'https://images.unsplash.com/photo-1601924582975-6e1a6d3d2d14',
  },
  {
    id: '5',
    nombre: 'Ensalada Caesar',
    descripcion: 'Lechuga, pollo, croutons, aderezo',
    precio: 3500,
    categoria: 'Principal',
    imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
  },
  {
    id: '6',
    nombre: 'Tarta de JyQ',
    descripcion: 'Porción',
    precio: 2000,
    categoria: 'Principal',
    imagen: 'https://images.unsplash.com/photo-1598511722180-0c9a9cbb2eb0',
  },
  {
    id: '7',
    nombre: 'Flan con DDl',
    descripcion: 'Casero',
    precio: 1500,
    categoria: 'Postre',
    imagen: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
  },
  {
    id: '8',
    nombre: 'Helado',
    descripcion: '2 bochas',
    precio: 1200,
    categoria: 'Postre',
    imagen: 'https://images.unsplash.com/photo-1511690742160-1c14e0a6fd94',
  },
  {
    id: '9',
    nombre: 'Ensalada de Frutas',
    descripcion: 'Fresco',
    precio: 1000,
    categoria: 'Postre',
    imagen: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  },
  {
    id: '10',
    nombre: 'Coca Cola',
    descripcion: 'Lata 354ml',
    precio: 800,
    categoria: 'Bebida',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Coca_Cola_2008.png',
  },
  {
    id: '11',
    nombre: 'Agua Mineral',
    descripcion: '500ml',
    precio: 600,
    categoria: 'Bebida',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Water_bottle.jpg',
  },
  {
    id: '12',
    nombre: 'Cerveza',
    descripcion: 'Lata 473ml',
    precio: 1200,
    categoria: 'Bebida',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Beer_glass.png',
  },
];
