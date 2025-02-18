import { NotFound } from "../../../errors/NotFound";
import { CreateFolder } from "../@types/CreateFolder"
import { Folder } from "../models/StorageItem"
import { storagePath } from "../utils/storagePath"

async function createFolder({name, path}: CreateFolder) {
  const folderPath = path ? 
    storagePath.joinPaths(name, path) : storagePath.joinPaths("user", name);

  return await Folder.create({
    name,
    path: folderPath,
  })
}

export const folderService = {
  createFolder
}