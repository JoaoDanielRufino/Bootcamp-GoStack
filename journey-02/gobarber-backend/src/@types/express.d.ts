// Adicionando uma variavel na interface Request do Express.

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    }
  }
}