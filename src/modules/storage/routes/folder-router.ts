import Router from "@koa/router";
import { folderController } from "../controllers/folder-controller";

export const folderRouter = new Router({prefix: "/folder"});

folderRouter.post("/", folderController.createFolder);
folderRouter.post("/move", folderController.moveFolder);
folderRouter.get("/", folderController.findFirst);
folderRouter.get("/properties/:id", folderController.getFolderProperties);
folderRouter.get("/descendants/direct/:id", folderController.findFolderDirectDescendants);
folderRouter.delete("/:id", folderController.deleteFolder);
