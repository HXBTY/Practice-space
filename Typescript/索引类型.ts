function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

export interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: (string | number)[] = pluck(person, ['name', 'age']); // [ 'Jarid', 35 ]
console.log(strings);

let personProps: keyof Person; // 'name' | 'age'
