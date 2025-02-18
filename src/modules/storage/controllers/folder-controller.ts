import { Context } from "koa";
import { validateCreateFolder } from "../validators/create-folder-validator";
import { folderService } from "../services/folder-service";

async function createFolder(ctx:  Context) {
  const input = validateCreateFolder(ctx.request.body);
  const result = await folderService.createFolder(input);

  ctx.status = 200;
  ctx.body = result;
}