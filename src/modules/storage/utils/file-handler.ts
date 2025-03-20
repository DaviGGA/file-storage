import {join} from "path";
import { createReadStream, ReadStream } from "fs";
import fs  from "fs/promises";
import { NotFound } from "../../../errors/NotFound";
import { pathHandler } from "./path-handler";

/**
 * Retrieves a readable file stream for a given image ID.
 *
 * @param {string} imageId - The unique identifier of the image file.
 * @returns {Promise<fs.ReadStream>} A promise that resolves to a readable stream of the requested file.
 * @throws {NotFound} If the file cannot be found or read.
 */
async function getFileStream(imageId: string): Promise<ReadStream> {
  const filePath = join(pathHandler.UPLOAD_PATH, imageId);
  
  const fileExist = await checkIfFileExist(filePath);
  if(!fileExist) {
    throw new NotFound("File does not Exist");
  }

  return createReadStream(filePath);
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
}
