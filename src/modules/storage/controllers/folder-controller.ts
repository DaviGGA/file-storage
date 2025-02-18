import { Context } from "koa";
import { validateCreateFolder } from "../validators/create-folder-validator";
import { folderService } from "../services/folder-service";

async function createFolder(ctx:  Context) {
  const input = validateCreateFolder(ctx.request.body);
  const result = await folderService.createFolder(input);

  ctx.status = 201;
  ctx.body = result;
}

async function findFolderDirectDescendants(ctx: Context) {
  const { id } = ctx.params;
  const result = await folderService.findFolderDirectDescendants(id);

  ctx.status = 200;
  ctx.body = result;
}

export const folderController = {
  createFolder,
  findFolderDirectDescendants
}