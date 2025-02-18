import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { errorHandler } from "./modules/common/middlewares/errorHandler";

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(cors())


export { app }


