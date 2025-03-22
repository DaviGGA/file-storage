import { z } from "zod";
import { MoveFolderBody } from "../@types/MoveFolderBody";

const moveFolderBodySchema = z.object({
  receivingId: z
    .string()
    .length(24, "receivingId must have 24 characters")
  ,
  movingId: z
    .string()
    .length(24, "movingId must have 24 characters")
})

export function validateMoveFolderBody(body: unknown): MoveFolderBody  {
  return moveFolderBodySchema.parse(body);
}