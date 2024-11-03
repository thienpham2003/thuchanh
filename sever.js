import express from "express";
import dotenv from "dotenv/config";
import viewEngine from "./viewEngine.js";
import initWebRoutes from "./router/web.js";
import session from "express-session";  
import RedisStore from "connect-redis";
import { createClient } from "redis";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 300;
let redisClient = createClient();
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({ client: redisClient, prefix: "myapp:", });
app.use(session({
    store: redisStore,
    secret: 'thienpham',
    resave: false,
    saveUninitialized: false, 
    // cookie: { secure: false }
})) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
viewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); 
});

