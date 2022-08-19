import { Collection, ObjectId, UpdateFilter } from 'mongodb';
import { toPascalCase } from '../../common/helper';
import { collections } from './connection';
import { NewUserRequest, UpdateRequest, Login, EditForm } from '../../models/interfaces';

export class UsersDatabase {
  protected _collection!: Collection;

  constructor() {
    if (collections.userCollection) {
      this._collection = collections.userCollection;
    }
  }

  async getUserByEmail(email: string) {
    const query = { email: email };
    return await this._collection.findOne(query);
  }

  async getUserById(userId: string) {
    const id = new ObjectId(userId);
    const query = { _id: id };
    return await this._collection.findOne(query);
  }

  async getSalariesByJob(occupancy: string) {
    //change to return const salaries = await this._collection
    const matchBy = toPascalCase(occupancy);
    const responseArr = await this._collection
      .aggregate([
        {
          $match: {
            'occupancy.title': matchBy,
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
    //TODO:
    //let average, calculate average
    //return object {average: #, salaries:[]}
    //
    // return salaries;
    const salariesArr: number[] = [];
    for (const person of responseArr) {
      salariesArr.push(person.occupancy.salary);
    }
    // console.log(salariesArr);
    // const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    const averageSalary = (salariesArr: number[]) => salariesArr.reduce((a, b) => a + b) / salariesArr.length;
    return {
      average: averageSalary(salariesArr).toFixed(2),
      salaries: salariesArr,
    };
  }

  async loginUser(existingUser: Login) {
    let { email, password } = existingUser;
    const lowerCaseEmail = email.toLowerCase().trim();
    email = lowerCaseEmail;

    return await this._collection.findOne({ email, password });
  }

  async createNewUser(newUser: NewUserRequest) {
    const title = toPascalCase(newUser.occupancy.title);
    newUser.occupancy.title = title;
    const email = newUser.email.toLowerCase().trim();
    newUser.email = email;

    const query = { ...newUser };
    return await this._collection.insertOne(query);
  }

  async updateUser(updateRequest: UpdateRequest) {
    try {
      const { _id, skills, currentSkills, ...filters } = updateRequest;
      const updatedSkills = {
        ...currentSkills,
        ...skills,
      };
      const query = { _id: new ObjectId(_id) };
      const toUpdate: UpdateFilter<any> = {
        $set: {
          ...filters,
          skills: updatedSkills,
        },
      };
      console.log(toUpdate);

      return await this._collection.updateOne(query, toUpdate);
    } catch (error) {
      console.log('updateUser:', error);
    }
  }

  async deleteUser(email: string) {
    const query = { email: email };
    return await this._collection.deleteOne(query);
  }
}
