import React, { createContext, useContext, useState, ReactNode } from 'react';
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
