import { NotFound } from "../../../errors/NotFound";
import { CreateFile } from "../@types/CreateFile";
import { MoveFileBody } from "../@types/MoveFileBody";
import { IFile } from "../models/File";
import { IFolder } from "../models/Folder";
import { File, Folder, IStorageItem, StorageItem } from "../models/StorageItem";
import { fileHandler } from "../utils/file-handler";
import { pathHandler } from "../utils/path-handler";

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

async function moveFile({fileId, folderId}: MoveFileBody): Promise<void> {
  const fileAndFolder: IStorageItem[] = await StorageItem.find({
      _id: {$in: [fileId, folderId]},
    })
    .limit(2)
  
  if (fileAndFolder.length < 2) {
    throw new NotFound("File or Folder not found");
  }

  const file = fileAndFolder
    .find(file => file._id.toString() === fileId) as IFile;
  
  const folder = fileAndFolder
    .find(folder => folder._id.toString() === folderId) as IFolder;

  return File.findByIdAndUpdate(
    file._id,
    {$set: {path: pathHandler.joinPath(file.name, folder.path)}},
    {new: true}
  )
}


export const fileService = {
  createFile,
  downloadFile,
  deleteFile,
  moveFile,
}