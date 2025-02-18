import { CreateFolder } from "../@types/CreateFolder"
import { Folder } from "../models/StorageItem"
import {join} from "path";

async function createFolder({name, path}: CreateFolder) {
  const folderPath = path ? 
    join(name, path) : join("user", name);

  return await Folder.create({
    name,
    path: folderPath,
  })
}

export const folderService = {
  createFolder
}