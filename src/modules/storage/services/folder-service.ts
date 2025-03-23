import { NotFound } from "../../../errors/NotFound";
import { CreateFolder } from "../@types/CreateFolder"
import { FolderProperties } from "../@types/FolderProperties.";
import { MoveFolderBody } from "../@types/MoveFolderBody";
import { IFile } from "../models/File";
import { IFolder } from "../models/Folder";
import { File, Folder, StorageItem } from "../models/StorageItem"
import { fileHandler } from "../utils/file-handler";

import { folderSearch } from "../utils/folder-search";
import { pathHandler } from "../utils/path-handler";
import path from "path";

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

async function moveFolder({receivingId, movingId}: MoveFolderBody) {
  const receivingFolderPromise: IFolder = Folder.findById(receivingId);
  const movingFolderPromise: IFolder = Folder.findById(movingId);
    
  const [receivingFolder, movingFolder] = await Promise.all([
    receivingFolderPromise,
    movingFolderPromise
  ])

  const movingItems = await StorageItem.find({
    path: folderSearch.allDescendants(movingFolder.path)
  })

  const movedItems = movingItems.map(item => {
    const commonPath = pathHandler.removeLast(receivingFolder.path);
    const fowardPath = item.path.replace(new RegExp(commonPath + "/", "g") , "");
    const newPath = path.join(receivingFolder.path, fowardPath);
    
    return {
      updateOne: {
        filter: { _id: item._id },  
        update: { $set: { path: newPath } }
      }
    }

  })

  await StorageItem.bulkWrite(movedItems);
}

async function getFolderProperties(id: string): Promise<FolderProperties> {
  const foundFolder: IFolder | null = await Folder.findById(id);

  if(!foundFolder) {
    throw new NotFound("Folder not found");
  }

  const descendants = await StorageItem.find({
    path: folderSearch.allDescendants(foundFolder.path, false),
  })

  return descendants.reduce((acc: FolderProperties, item) => {
    return item.type === "file" ?
    {
      ...acc,
      totalSize: acc.totalSize + item.size,
      fileCount: acc.fileCount + 1,
    } :
    {
      ...acc,
      folderCount: acc.folderCount + 1
    }
  }, {totalSize: 0, folderCount: 0, fileCount: 0})
}

export const folderService = {
  createFolder,
  findFolderDirectDescendants,
  findFirst,
  deleteFolder,
  moveFolder,
  getFolderProperties
}