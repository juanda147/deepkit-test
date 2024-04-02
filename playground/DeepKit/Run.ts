import { deserialize, serialize } from "@deepkit/type";
import { Employee } from "./entities/Employee";
import { PhoneNumber } from "./entities/PhoneNumber";

const employee = new Employee(1, 'John Doe');
const plainObjectEmployee = serialize<Employee>(employee);
const classInstanceEmployee = deserialize<Employee>(plainObjectEmployee);

console.log(plainObjectEmployee);
console.log(classInstanceEmployee.greet());

const phoneNumber = PhoneNumber.create('213-326-7683').getValue();
const plainObjectPhoneNumber = serialize<PhoneNumber>(phoneNumber);
console.log(plainObjectPhoneNumber);

const classInstancePhoneNumber = deserialize<PhoneNumber>(plainObjectPhoneNumber);
console.log(classInstancePhoneNumber.formatPhoneNumberAsE164);
console.log(classInstancePhoneNumber.couldBeMobile);
console.log(classInstancePhoneNumber.formatPhoneNumberAsNational);