import { z } from "zod";
import { MoveFileBody } from "../@types/MoveFileBody";

const moveFileBodySchema = z.object({
  fileId: z
    .string()
    .length(24, "fileId must have 24 characters")
  ,
  folderId: z
    .string()
    .length(24, "fileId must have 24 characters")
})

export function validateMoveFileBody(body: unknown): MoveFileBody  {
  return moveFileBodySchema.parse(body);
}