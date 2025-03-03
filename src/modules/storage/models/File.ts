import mongoose from "mongoose";
import { BaseStorageItem, StorageItem } from "./StorageItem";

export type IFile = {
  size: number,
  type: "file",
  file_type: string,
} & BaseStorageItem & Document


export const fileSchema = new mongoose.Schema<IFile>({
  size: {
    required: true,
    type: Number
  },
  file_type: {
    required: true,
    type: String
  }
})

