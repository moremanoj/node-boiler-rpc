import { UsersApiControllerFactory } from "./usersFactory";

export { getUsers, createUsers };

async function getUsers(req, res) {
    try {
        const controller = UsersApiControllerFactory.getUsersApiController();
        const users = await controller.getUsers();

        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ errorCode: error.errorCode });
            return;
        }
        res.sendStatus(500);
    }
}

async function createUsers(req, res) {
    try {
        const controller = UsersApiControllerFactory.getUsersApiController();
        const users = await controller.createUsers(req.body);
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ errorCode: error.errorCode });
            return;
        }
        res.sendStatus(500);
    }
}