export class Employee {
    Code: number;
    Name: string;

    constructor(code: number, name: string) {
            this.Name = name;
            this.Code = code;
    }

    greet() {
        return `Hello, my name is ${this.Name}`;
    }
}