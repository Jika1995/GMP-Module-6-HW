export class MyCustomError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = 'MyCustomError';
  }
};