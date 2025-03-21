import { Context } from "koa";
import { validateCreateFile } from "../validators/create-file-validator";
import { fileService } from "../services/file-service";
import { validateMoveFileBody } from "../validators/move-file-body-validator";

async function createFile(ctx: Context) {

  const createFile = validateCreateFile(ctx.request.body);
  const file = ctx.request.file; 

  const newFile = await fileService.createFile({...createFile, file})

  ctx.status = 201;
  ctx.body = newFile;
}

async function downloadFile(ctx: Context) {

  const { file_id } = ctx.params;

  const fileStream = await fileService.downloadFile(file_id);
  
  ctx.set('Content-Disposition', `attachment; filename="${file_id}"`);
  ctx.set('Content-Type', 'application/octet-stream');
  ctx.status = 200;
  ctx.body = fileStream
}

async function deleteFile(ctx: Context) {
  
  const { id } = ctx.params;

  const deletedFile = await fileService.deleteFile(id);

  ctx.status = 200;
  ctx.body = deletedFile
}

async function moveFile(ctx: Context) {
  console.log(ctx.request.body);
  const moveFileBody = validateMoveFileBody(ctx.request.body);

  const movedFile = await fileService.moveFile(moveFileBody);

  ctx.status = 200;
  ctx.body = movedFile;
}

export const fileController = {
  createFile,
  downloadFile,
  deleteFile,
  moveFile
}
