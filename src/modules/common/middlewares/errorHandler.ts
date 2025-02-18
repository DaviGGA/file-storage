import { Context, Next } from "koa";

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = "Internal Server Error"
    console.log(error);
  }
}