import express from "express";
import dotenv from "dotenv/config";
import viewEngine from "./viewEngine.js";
import date from "./date.js";
import getURL from "./getURL.js";
import initWebRoutes from "./router/web.js";
const app = express();
const port = process.env.PORT || 3000; 
viewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); 
});

