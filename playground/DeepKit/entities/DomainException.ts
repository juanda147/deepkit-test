export class DomainException<T> extends Error {
    exceptionSource?: T;
    constructor(message?: string, exceptionSource?: T) {
      super(message); // 'Error' breaks prototype chain here
      this.exceptionSource = exceptionSource;
      Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
  }
  