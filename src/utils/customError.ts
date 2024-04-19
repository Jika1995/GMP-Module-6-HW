export interface CustomError {
  status: number;
  message: string;
}

export class MyCustomError implements CustomError {
  constructor(public status: number, public message: string) {}
}