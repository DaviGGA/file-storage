import Router from "@koa/router";
import { folderController } from "../controllers/folder-controller";

export const folderRouter = new Router({prefix: "/folder"});

folderRouter.post("/", folderController.createFolder);
folderRouter.get("/", folderController.findFirst);
folderRouter.delete("/:id", folderController.deleteFolder);
folderRouter.get("/descendants/direct/:id", folderController.findFolderDirectDescendants);
