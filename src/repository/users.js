import { Users } from "../models/users";

export class UserRepository {
    constructor(){}
    async save(input) {
        const data = {...input};
        const result = await Users.create(data);
        return result;
    }

    async get() {
        const data = await Users.find({})
        return data
    }
}