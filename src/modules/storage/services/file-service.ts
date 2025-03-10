import { CreateFile } from "../@types/CreateFile";
import { File } from "../models/StorageItem";
import { fileHandler } from "../utils/file-handler";
import { pathHandler } from "../utils/path-handler";
import fs from "fs/promises";

async function createFile({name, path, file}: CreateFile) {

  const fileName = name ?? file.originalname

  return await File.create({
    name: fileName,
    path: pathHandler.joinPath(fileName, path ?? null),
    size: file.size,
    mimetype: file.mimetype,
    image_id: file.filename
  })

}

async function downloadFile(imageId: string) {
  return await fileHandler.getFileStream(imageId);
}


export const fileService = {
  createFile,
  downloadFile
}