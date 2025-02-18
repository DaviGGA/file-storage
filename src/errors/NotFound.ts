import { HttpException } from "./HttpException";

export class NotFound extends HttpException {
  constructor(message: string){
    super("NotFound", message, 404)
  }
}