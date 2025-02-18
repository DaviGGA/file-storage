import { z } from "zod";
import { CreateFolder } from "../@types/CreateFolder";

const createFolderSchema = z.object({
  name: z.string().min(1,"field name is required"),
  path: z.string().nullable()
})


export function validateCreateFolder(folder: unknown): CreateFolder  {
  return createFolderSchema.parse(folder);
}