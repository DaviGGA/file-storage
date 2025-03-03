import { CreateFile } from "../@types/CreateFile";
import { File } from "../models/StorageItem";
import { pathHandler } from "../utils/path-handler";

async function createFile({name, path, file}: CreateFile) {

  const fileName = name ?? file.originalname

  return await File.create({
    name: fileName,
    path: pathHandler.joinPath(fileName, path ?? null),
    size: file.size,
    mimetype: file.mimetype
  })

}


export const fileService = {
  createFile
}