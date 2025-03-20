import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { errorHandler } from "./modules/common/middlewares/errorHandler";
import { folderRouter } from "./modules/storage/routes/folder-router";
import { fileRouter } from "./modules/storage/routes/file-router";

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(cors());
app.use(folderRouter.routes());
app.use(fileRouter.routes());

export { app }


