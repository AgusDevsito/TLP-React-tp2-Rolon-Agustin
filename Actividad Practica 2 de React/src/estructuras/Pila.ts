export class Pila<T> {
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
