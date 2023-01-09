import { registerUserRoutes } from "./api/users/userRoutes";
export class AppRoutes
{
    constructor(app)
    {
        this.app = app;

        return function initialize(app) {
            // app.use('/',(req, res) => {
            //     try {
            //         console.log('Health Check !!!');
            //         res.send({ message: "healthy !!!", status: 200 }).status(200);
            //     } catch (error) {
            //         throw new Error("Not healthy !!! :( ")
            //     }
            // })
            registerUserRoutes(app);
        }
    }
}