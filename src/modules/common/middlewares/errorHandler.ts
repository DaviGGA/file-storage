import { Context, Next } from "koa";
import { HttpException } from "../../../errors/HttpException";
import { ZodError } from "zod";

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error: unknown) {

    if (error instanceof HttpException) {
      ctx.status = error.code;
      ctx.body = {
        name: error.name,
        message: error.message
      }
      return 
    }

    if (error instanceof ZodError) {
      ctx.status = 400;
      ctx.body = {
        name: "ValidationError",
        issues: error.issues.map(issue => ({
          path: issue.path,
          message: issue.message
        }))
      }
      return
    }

  }
}