import {join} from "path";
import { createReadStream, ReadStream } from "fs";
import fs  from "fs/promises";
import { NotFound } from "../../../errors/NotFound";
import { pathHandler } from "./path-handler";
import { IFile } from "../models/File";

/**
 * Retrieves a readable file stream for a given file ID.
 *
 * @param {string} fileId - The unique identifier of the file file.
 * @returns {Promise<fs.ReadStream>} A promise that resolves to a readable stream of the requested file.
 * @throws {NotFound} If the file cannot be found or read.
 */
async function getFileStream(fileId: string): Promise<ReadStream> {
  const filePath = join(pathHandler.UPLOAD_PATH, fileId);
  
  const fileExist = await checkIfFileExist(filePath);
  if(!fileExist) {
    throw new NotFound("File does not Exist");
  }

  return createReadStream(filePath);
}

/**
 * Deletes a file from the upload directory.
 *
 * @async
 * @function deleteFile
 * @param {IFile} file - The file object containing metadata.
 * @param {string} file.file_id - The unique identifier of the file.
 * @throws {Error} If an error occurs while deleting the file.
 * @returns {Promise<void>} Resolves when the file is successfully deleted.
 */
async function deleteFile(file: IFile) {
  const filePath = join(pathHandler.UPLOAD_PATH, file.file_id)
  fs.unlink(filePath)
}


async function checkIfFileExist(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true
  } catch (error) {
    return false
  }
}

export const fileHandler = {
  getFileStream,
  deleteFile
}
