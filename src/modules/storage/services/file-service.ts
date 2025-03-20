import { CreateFile } from "../@types/CreateFile";
import { IFile } from "../models/File";
import { File } from "../models/StorageItem";
import { fileHandler } from "../utils/file-handler";
import { pathHandler } from "../utils/path-handler";
import fs from "fs/promises";

async function createFile({name, path, file}: CreateFile): Promise<IFile> {

  const fileName = name ?? file.originalname

  return File.create({
    name: fileName,
    path: pathHandler.joinPath(fileName, path ?? null),
    size: file.size,
    mimetype: file.mimetype,
    file_id: file.filename
  })

}

async function downloadFile(imageId: string) {
  return await fileHandler.getFileStream(imageId);
}

async function deleteFile(id: string): Promise<IFile | null> {
  return File.findOneAndDelete({_id: id});
}


export const fileService = {
  createFile,
  downloadFile,
  deleteFile
}