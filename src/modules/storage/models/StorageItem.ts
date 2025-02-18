import mongoose, { Model } from "mongoose";
import { fileSchema, IFile } from "./File";
import { folderSchema, IFolder } from "./Folder";

export type BaseStorageItem = {
  name: string,
  path: string
}

export type IStorageItem = IFile | IFolder

const baseSchema = new mongoose.Schema<IStorageItem>(
  {
    name: String,
    path: {
      type: String,
      unique: true
    },
  },
  {
    collection: "StorageItem",
    discriminatorKey: "type",
    timestamps: true
  }
)

export const StorageItem: Model<IStorageItem> = mongoose.model('StorageItem', baseSchema);
export const File = StorageItem.discriminator("file", fileSchema);
export const Folder = StorageItem.discriminator("folder", folderSchema)







