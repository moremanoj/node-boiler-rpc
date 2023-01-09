import { UsersController } from './usersController';

export class UsersApiControllerFactory {
    static getUsersApiController() {
        return new UsersController();
    }
}
