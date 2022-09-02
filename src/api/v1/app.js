//#region require third party packages
const express = require("express");
const compression = require("compression");
const cors = require("cors");
//#endregion
//#region global app configuration
const projectConfig = require("../../config/index");
const { registerRoutes } = require("./router/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors(projectConfig.server.httpServer.cors));
registerRoutes(app);

//#endregion
const PORT = projectConfig.server.httpServer.port;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
