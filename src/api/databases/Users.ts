import { Collection, MongoClient } from "mongodb";

export class UsersDatabase {
  connectionString!: string;
  collectionName!: string;
  client!: MongoClient;
  dbName!: string;
  collection!: Collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connectionString = process.env.connectionString || "";
    this.dbName = process.env.dbName || "";
    this.client = new MongoClient(this.connectionString);
  }

  async start() {
    await this.client.connect();
    this.collection = this.client
      .db(this.dbName)
      .collection(this.collectionName);
    console.log({
      location: "UserDatabase.start()",
      info: `${this.collection.dbName}`,
    });
  }

  async stop() {
    await this.client.close();
  }

  async getUserByEmail(email: string) {
    const query = { email: email };
    return await this.collection.findOne(query);
  }
}
