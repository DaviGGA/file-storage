import { z } from "zod";
import { CreateFile } from "../@types/CreateFile";

const createFileSchema = z.object({
  name: z
    .string()
    .min(1,"field name is required")
    .optional()
    .refine(name => 
      name ? !/[!@#$%^&*(),.?":{}|<>\\/]/.test(name) : true,
      'The only special character allowed is "-"'
    ),
  path: z
    .string()
    .optional()
    .refine(path => 
      path ? !/[!@#$%^&*(),.?":{}|<>\\]/.test(path) : true,
      'The only special characters allowed is "-" or "/"'
    )
})

export function validateCreateFile(folder: unknown): Omit<CreateFile, "file">  {
  return createFileSchema.parse(folder);
}