import { Request, Response } from "express";
import { UsersDatabase } from "../../databases/Users";

const collectionName = process.env.userCollection || "";

export async function getUserByEmail(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const email = req.query.email as string;
    console.log({
      location: "users.controller.getUserByEmail",
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

export async function getSalariesByJob(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const occupancy = req.query.occupancy as string;
    console.log({
      location: "users.controller.getSalariesByJob",
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    await client.start();
    const result = await client.getSalariesByJob(occupancy);
    if (result) {
      res.status(200).send({
        message: "Users retrieved successfully.",
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `Salaries with job title "${occupancy}" were not found.`,
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

export async function createNewUser(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const newUser= req.query as object;
    console.log({
      location: "users.controller",
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    await client.start();
    const result = await client.createNewUser(newUser);
    if (result) {
      res.status(200).send({
        message: `Inserted document with _id: ${result.insertedId}`, 
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `User could not be created`,
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

export async function updateUser(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const updatedUser = req.query as object;
    console.log({
      location: "users.controller",
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    await client.start();
    const result = await client.updateUser(updatedUser);
    if (result) {
      res.status(200).send({
        message: "User updated successfully.",
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `User with email "${req.query.email}" was not found.`,
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

export async function deleteUser(req: Request, res: Response) {
  const client = new UsersDatabase(collectionName);
  try {
    const email = req.query.email as string;
    console.log({
      location: "users.controller",
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    await client.start();
    const result = await client.deleteUser(email);
    if (result) {
      res.status(200).send({
        message: "User deleted successfully.",
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
