import mongoose from "mongoose";
import { BaseStorageItem, StorageItem } from "./StorageItem";
import { fileHandler } from "../utils/file-handler";

export type IFile = {
  size: number,
  type: "file",
  mimetype: string,
  file_id: string
} & BaseStorageItem & Document


export const fileSchema = new mongoose.Schema<IFile>({
  size: {
    required: true,
    type: Number
  },
  mimetype: {
    required: true,
    type: String,
  },
  file_id: {
    required: true,
    type: String
  }
})

fileSchema.post("findOneAndDelete", (file: IFile | null) => {
  if(!file) return;
  fileHandler.deleteFile(file);
})

fileSchema.post("deleteMany", res => {
  console.log("MANY FILE", res);
})