import mongoose from "mongoose"
import { BaseStorageItem, StorageItem } from "./StorageItem"

export type IFolder = {
  type: "folder"
} & BaseStorageItem & Document

export const folderSchema = new mongoose.Schema<IFolder>({})

