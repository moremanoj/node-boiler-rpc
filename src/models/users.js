import {  Schema, model } from "mongoose";

const UsersSchema = new Schema({
    name: { type: String, required: true},
    age: { type: Number, min: 18, index: true },
    email: { type: String, required: true},
    empCode: {type: String, required: true }
  },{versionKey: false});
  
export const Users = model("Users", UsersSchema);
