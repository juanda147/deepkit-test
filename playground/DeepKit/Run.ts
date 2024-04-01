import { deserialize, serialize } from "@deepkit/type";
import { Employee } from "./entities/Employee";

const employee = new Employee(1, 'John Doe');
const serializedEmployee = serialize<Employee>(employee);    
const deSerializedEmployee = deserialize<Employee>(serializedEmployee);

console.log(serializedEmployee);
console.log(deSerializedEmployee.empCode);