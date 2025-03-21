import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config/config";
import { connectDatabase } from "./database/mongo";
import { StorageItem, IStorageItem } from "./modules/storage/models/StorageItem";
import { folderSearch } from "./modules/storage/utils/folder-search";
import { folderService } from "./modules/storage/services/folder-service";

app.listen(config.PORT, async () => {
  console.log(`Server open on port ${config.PORT}`);
  await connectDatabase(); 

  StorageItem.find().then(res => console.log(res))
})