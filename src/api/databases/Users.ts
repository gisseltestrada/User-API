import { query } from 'express';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { NewUserRequest, UpdateRequest } from '../../models/interfaces';

export class UsersDatabase {
  connectionString!: string;
  collectionName!: string;
  client!: MongoClient;
  dbName!: string;
  collection!: Collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connectionString = process.env.connectionString || '';
    this.dbName = process.env.dbName || '';
    this.client = new MongoClient(this.connectionString);
  }

  async start() {
    await this.client.connect();
    this.collection = this.client
      .db(this.dbName)
      .collection(this.collectionName);
    // console.log({
    //   location: "UserDatabase.start()",
    //   info: `${this.collection.dbName}`,
    // });
  }

  async stop() {
    await this.client.close();
  }

  async getUserByEmail(email: string) {
    const query = { email: email };
    return await this.collection.findOne(query);
  }

  async getSalariesByJob(occupancy: string) {
    return await this.collection
      .aggregate([
        {
          $match: {
            'occupancy.title': occupancy,
          },
        },
        {
          $project: {
            'occupancy.salary': 1,
          },
        },
        {
          $sort: {
            'occupancy.salary': 1,
          },
        },
      ])
      .toArray();
  }

  async createNewUser(newUser: NewUserRequest) {
    const query = {...newUser};
    return await this.collection.insertOne(query);
  }

  async updateUser(updateRequest: UpdateRequest) {
    const { _id, ...filters } = updateRequest;

    const query = { _id: new ObjectId(_id) };

    return await this.collection.updateOne(query, { $set: filters });
  }

  async deleteUser(email: string) {
    const query = { email: email };
    return await this.collection.deleteOne(query);
  }
}
