import { NotFound } from "../../../errors/NotFound";
import { CreateFolder } from "../@types/CreateFolder"
import { IFile } from "../models/File";
import { IFolder } from "../models/Folder";
import { File, Folder, StorageItem } from "../models/StorageItem"
import { fileHandler } from "../utils/file-handler";

import { folderSearch } from "../utils/folder-search";
import { pathHandler } from "../utils/path-handler";

async function createFolder({name, path}: CreateFolder) {
  const folderPath = pathHandler.joinPath(name, path);

  return Folder.create({
    name,
    path: folderPath,
  })
}

async function findFolderDirectDescendants(id: string) {
  const folder: IFolder | null = await Folder.findById(id);
  if(!folder) throw new NotFound("Folder not found");
  return await StorageItem.find({
    path: folderSearch.directDescendants(folder.path)
  })
}

async function findFirst() {
  return StorageItem.find({
    path: folderSearch.directDescendants("user")
  })
}

async function deleteFolder(id: string) {
  const folder: IFolder | null = await Folder.findById(id);
  
  if(!folder) throw new NotFound("Folder not Found");

  const toDeleteFiles: IFile[] = await File.find({
    path: folderSearch.allDescendants(folder.path)
  })

  const deleteDiskFilePromises = toDeleteFiles
    .map(fileHandler.deleteFile);

  const deleteStoragePromise = StorageItem.deleteMany({
    path: folderSearch.allDescendants(folder.path)
  })
  
  await Promise.all([
    ...deleteDiskFilePromises, 
    deleteStoragePromise
  ])
}

export const folderService = {
  createFolder,
  findFolderDirectDescendants,
  findFirst,
  deleteFolder
}