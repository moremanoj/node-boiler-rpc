import { connect, set } from "mongoose";

export class DatabaseService {
  static async getConnection() {
    set("strictQuery", false);
    const url = 'mongodb+srv://psudoadmin:RGMVxTYdMboD34ov@cluster0.vbl1pgs.mongodb.net/test'
    const connection = await connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true });
           
    if(connection) {
      console.log("db connected !!!");
    }
    return connection;
  }

  static async closeConnection() {
    let connection;
    try {
      connection = getConnection();
      if (connection.isConnected) {
        await connection.close();
      }
    } catch (e) {}
  }
}
