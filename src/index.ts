import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config/config";
import { connectDatabase } from "./database/mongo";



app.listen(3001, async () => {
  console.log(`Server open on port ${config.PORT}`);
  await connectDatabase();

  await mongoose.connection.dropDatabase()


})