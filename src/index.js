import { App } from "./app";
import * as SwaggerExpress from "swagger-express-mw";

export { startApp };

const startApp = (function (app) {
  return new Promise(async function (resolve, reject) {
    const port = process.env.PORT || 3000;
    // Execute commands in clean exit

    const swaggerConfig = {
      appRoot: __dirname,
      swaggerFile: `${__dirname}/config/swagger.json`,
      configDir: `${__dirname}/config`,
       // swaggerSecurityHandlers: {
       //   Bearer: bearerSecurityHandler,
       //   Guest: guestSecurityHandler,
       // },
    };

   
    // SwaggerExpress.create(
    //   swaggerConfig,
    //   async function (err, swaggerExpress) {
    //     if (err) {
    //       reject(err);
    //     }

    //     // Execute commands in clean exit
    //     process.on("exit", function () {
    //       console.log("Exiting ... Bye ..."); // Uses console log because shutdown is too fast
    //     });

    //     process.on("SIGINT", function () {
    //       console.log("Gracefully shutting down from  SIGINT"); // Uses console log because shutdown is too fast
    //       process.exit();
    //     });

    //     process.on("SIGTERM", function () {
    //       console.log("Parent SIGTERM detected"); // Uses console log because shutdown is too fast
    //       // exit cleanly
    //       process.exit(0);
    //     });

    //     process.on("unhandledRejection", (error) => {
    //       // Will print 'unhandledRejection err is not defined'
    //       console.error({ message: "Unhandled process error", error });
    //     });

    //     await app.initializeAsync(swaggerExpress);
    //     app.server = app.express.listen(port);
    //     console.info({ message: `App listening on port ${port}` });

    //     resolve();
    //   }
    // );

    process.on("unhandledRejection", (error) => {
      // Will print 'unhandledRejection err is not defined'
      console.error({ message: "Unhandled process error", error });
    });
    await app.initialize();
    app.server = app.express.listen(port);
    console.info({ message: `App listening on port ${port}` });
    resolve();

  });
})(new App());
