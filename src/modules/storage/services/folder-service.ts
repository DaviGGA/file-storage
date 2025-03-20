import { NotFound } from "../../../errors/NotFound";
import { CreateFolder } from "../@types/CreateFolder"
import { IFolder } from "../models/Folder";
import { Folder, StorageItem } from "../models/StorageItem"

import { folderSearch } from "../utils/folder-search";
import { pathHandler } from "../utils/path-handler";

async function createFolder({name, path}: CreateFolder) {
  const folderPath = pathHandler.joinPath(name, path);

  return await Folder.create({
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
  return await StorageItem.find({
    path: folderSearch.directDescendants("user")
  })
}

export const folderService = {
  createFolder,
  findFolderDirectDescendants,
  findFirst
}