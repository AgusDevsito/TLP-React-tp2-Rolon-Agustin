export class Cola<T> {
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
