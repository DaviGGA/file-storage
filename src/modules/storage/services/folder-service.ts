import { NotFound } from "../../../errors/NotFound";
import { CreateFolder } from "../@types/CreateFolder"
import { IFolder } from "../models/Folder";
import { Folder } from "../models/StorageItem"
import {join} from "path";
import { folderSearch } from "../utils/folder-search";

async function createFolder({name, path}: CreateFolder) {
  const folderPath = path ? 
    join(path, name) : join("user", name);

  return await Folder.create({
    name,
    path: folderPath,
  })
}

async function findFolderDirectDescendants(id: string) {
  const folder: IFolder | null = await Folder.findById(id);
  if(!folder) throw new NotFound("Folder not found");
  return await Folder.find({
    path: folderSearch.directDescendants(folder.path)
  })
}

export const folderService = {
  createFolder,
  findFolderDirectDescendants
}