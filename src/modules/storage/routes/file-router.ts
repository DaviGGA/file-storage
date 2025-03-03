import Router from "@koa/router";
import { fileController } from "../controllers/file-controller";
import multer from "@koa/multer";

const upload = multer({dest:"./src/uploads"});

export const fileRouter = new Router({prefix: "/file"});

fileRouter.post("/", upload.single("file"), fileController.createFile);

