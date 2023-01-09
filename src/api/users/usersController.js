import { UserRepository } from "../../repository/users";
import { publishMessage } from "../../services/publish";
export class UsersController {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUsers(model) {
        const result = await this.userRepository.save(model);
        const published = await publishMessage(result);
        return { result, published }
    };
    async getUsers() {
        console.log('get Users initiated');
        const result = await this.userRepository.get();
        return result;
    };
}