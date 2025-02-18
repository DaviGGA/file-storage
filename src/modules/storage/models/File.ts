import mongoose from "mongoose";
import { BaseStorageItem, StorageItem } from "./StorageItem";

export type IFile = {
  size: number,
  type: "file"
} & BaseStorageItem & Document


export const fileSchema = new mongoose.Schema<IFile>({
  size: Number,
})

