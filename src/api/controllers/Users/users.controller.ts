import { Request, Response } from "express";
import { UsersDatabase } from "../../databases/Users";

const collectionName = process.env.userCollection || "";

export async function getUserByEmail(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const email = req.query.email as string;
    console.log({
      location: "users.controller",
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    await client.start();
    const result = await client.getUserByEmail(email);
    if (result) {
      res.status(200).send({
        message: "User retrieved successfully.",
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `User with email "${email}" was not found.`,
        success: false,
      });
    }
  } catch (error: unknown) {
    res.status(500).send({
      message: "A server side error ocurred. Please try again.",
      success: false,
      erorr: error,
      query: req.query,
    });
  } finally {
    await client.stop();
  }
}
