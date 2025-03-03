import { Context } from "koa";
import { validateCreateFile } from "../validators/create-file-validator";
import { fileService } from "../services/file-service";

async function createFile(ctx: Context) {

  const createFile = validateCreateFile(ctx.request.body);
  const file = ctx.request.file; 

  const result = await fileService.createFile({...createFile, file})

  ctx.status = 201;
  ctx.body = {success: true}
}

export const fileController = {
  createFile
}
