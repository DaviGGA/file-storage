import { z } from "zod";
import { CreateFolder } from "../@types/CreateFolder";

const createFolderSchema = z.object({
  name: z
    .string()
    .min(1,"field name is required")
    .refine(name => 
      !/[!@#$%^&*(),.?":{}|<>\\/]/.test(name),
      'The only special character allowed is "-"'
    ),
  path: z
    .string()
    .nullable()
    .refine(path => 
      path ? !/[!@#$%^&*(),.?":{}|<>\\]/.test(path) : true,
      'The only special characters allowed is "-" or "/"'
    )
})

export function validateCreateFolder(folder: unknown): CreateFolder  {
  return createFolderSchema.parse(folder);
}