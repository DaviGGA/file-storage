import Router from "@koa/router";
import { folderController } from "../controllers/folder-controller";

export const folderRouter = new Router({prefix: "/folder"});

folderRouter.post("/", folderController.createFolder);
