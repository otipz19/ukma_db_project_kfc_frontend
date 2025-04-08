export interface ConstructorOfType<T> extends Function {
  new (...args: any[]): T;
}
