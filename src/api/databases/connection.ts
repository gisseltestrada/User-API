import { Collection, Db, MongoClient } from 'mongodb';

interface MongoCollections {
  userCollection: Collection | undefined;
  jobCollection: Collection | undefined;
}

export const collections: MongoCollections = {
  userCollection: undefined,
  jobCollection: undefined,
};
export const connectionString = process.env.connectionString || '';
export const dbName = process.env.dbName || '';
export const userCollection = process.env.userCollection || '';
export const jobCollection = process.env.jobCollection || '';

export async function connectToDb() {
  const client: MongoClient = new MongoClient(connectionString);
  await client.connect();
  const db: Db = client.db(dbName);
  collections.jobCollection = db.collection(jobCollection);
  collections.userCollection = db.collection(userCollection);
  console.log('Successully connected to db.');
}
