require("dotenv").config();
const chalk = require("chalk");
const PORT = process.env.PORT || 3010;
const serverInit = require("./server");

const mainErrorHandler = (err) => console.error(err);
process.on("uncaughtException", mainErrorHandler);
process.on("unhandledRejection", mainErrorHandler);

serverInit().then((server) =>
  server.listen(PORT, () => {
    console.log('Up & running on http://localhost:' + chalk.blue.underline.bold(PORT));
    console.log('Swagger UI is available on http://localhost:' + chalk.blue.underline.bold(`${PORT}/data/api/doc`));
    console.log('Metrics are available on http://localhost:' + chalk.blue.underline.bold(`${PORT}/status`));
  })
);
