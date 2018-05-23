class BaseDataService {
  constructor() {
    if (this.constructor === BaseDataService) {
      throw new TypeError("Cannot construct abstract Base Data Service class.");
    }
  }

  getAll() {
    throw new TypeError("Invoking abstract method is not allowed");
  }
}