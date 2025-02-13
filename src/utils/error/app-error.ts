export class AppError extends Error {
  statusCode: number;
  explaination: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.explaination = message;
  }
}