import { Context } from "koa";
import { validateCreateFolder } from "../validators/create-folder-validator";
import { folderService } from "../services/folder-service";
import { validateMoveFolderBody } from "../validators/move-folder-body-validator";

async function createFolder(ctx:  Context) {
  const input = validateCreateFolder(ctx.request.body);
  const result = await folderService.createFolder(input);

  ctx.status = 201;
  ctx.body = result;
}

async function deleteFolder(ctx: Context) {
  const { id } = ctx.params;

  await folderService.deleteFolder(id);

  ctx.status = 200;
  ctx.body = {};
}

async function findFolderDirectDescendants(ctx: Context) {
  const { id } = ctx.params;
  const result = await folderService.findFolderDirectDescendants(id);

  ctx.status = 200;
  ctx.body = result;
}

async function findFirst(ctx: Context) {
  const result = await folderService.findFirst();
  ctx.staus = 200;
  ctx.body = result;
}

async function moveFolder(ctx: Context) {
  const moverFolderBody = validateMoveFolderBody(ctx.request.body);

  await folderService.moveFolder(moverFolderBody);

  ctx.status = 200;
  ctx.body = {};
}

async function getFolderProperties(ctx: Context) {
  const { id } = ctx.params;

  const folderProperties = await folderService.getFolderProperties(id);

  ctx.status = 200;
  ctx.body = folderProperties
}

export const folderController = {
  createFolder,
  deleteFolder,
  findFolderDirectDescendants,
  findFirst,
  moveFolder,
  getFolderProperties
}