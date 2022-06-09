import { query } from "express";
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
            "occupancy.title": occupancy,
          },
        },
        {
          $project: {
            "occupancy.salary": 1,
          },
        },
        {
          $sort: {
            "occupancy.salary": 1,
          },
        },
      ])
      .toArray();
  }

  async createNewUser(newUser: any) {
    const query = {
      email: newUser.email as string,
      password: newUser.password as string,
      profile: {
        name: newUser.name as string,
        dob: newUser.dob as string,
        address: newUser.address as string,
      },
      occupancy: {
        title: newUser.title as string,
        company: newUser.company as string,
        salary: newUser.salary as number,
        role: [newUser.role as string],
      },
    };
    return await this.collection.insertOne(query);
  }

  async updateUser(updatedUser: any) {
     const query = {
       email: updatedUser.email as string,
       password: updatedUser.password as string,
       profile: {
         name: updatedUser.name as string,
         dob: updatedUser.dob as string,
         address: updatedUser.address as string,
       },
       occupancy: {
         title: updatedUser.title as string,
         company: updatedUser.company as string,
         salary: updatedUser.salary as number,
         role: [updatedUser.role as string],
       },
     };
    return await this.collection.updateOne({email: updatedUser.email}, {$set:query});
  }

  async deleteUser(email: string) {
    const query = { email: email };
    return await this.collection.deleteOne(query);
  }
}
