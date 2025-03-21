import Router from "@koa/router";
import { fileController } from "../controllers/file-controller";
import multer from "@koa/multer";
import { Context } from "koa";

const upload = multer({dest:"./src/uploads"});

export const fileRouter = new Router({prefix: "/file"});

fileRouter.get("/", (ctx: Context) => ctx.status = 200)
fileRouter.get("/download/:file_id", fileController.downloadFile);
fileRouter.post("/", upload.single("file"), fileController.createFile);
fileRouter.post("/move", fileController.moveFile);
fileRouter.delete("/:id", fileController.deleteFile);

