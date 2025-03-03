import multer from "@koa/multer"

export type CreateFile = {
  name?: string,
  path?: string,
  file: multer.File
}