import mongoose from "mongoose";
import { BaseStorageItem, StorageItem } from "./StorageItem";

export type IFile = {
  size: number,
  type: "file",
  mimetype: string,
} & BaseStorageItem & Document


export const fileSchema = new mongoose.Schema<IFile>({
  size: {
    required: true,
    type: Number
  },
  mimetype: {
    required: true,
    type: String
  }
})

