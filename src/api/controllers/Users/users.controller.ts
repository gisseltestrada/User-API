import { Request, Response } from 'express';
import { NewUserRequest, UpdateRequest, Login } from '../../../models/interfaces';
import { UsersDatabase } from '../../databases/Users';

export async function getUserByEmail(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const email = req.query.email as string;
    console.log({
      location: 'users.controller.getUserByEmail',
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    const result = await client.getUserByEmail(email);
    if (result) {
      res.status(200).send({
        message: 'User retrieved successfully.',
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
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}
export async function getUserById(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const userId = req.query._id as string;
    console.log({
      location: 'users.controller.getUserById',
      info: `Got request ${JSON.stringify(req.query)}`,
    });
    const result = await client.getUserById(userId);
    if (result) {
      res.status(200).send({
        message: 'User retrieved successfully.',
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `User with id "${userId}" was not found.`,
        success: false,
      });
    }
  } catch (error: unknown) {
    res.status(500).send({
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}

export async function getSalariesByJob(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const occupancy = req.query.occupancy as string;
    console.log({
      location: 'users.controller.getSalariesByJob',
      info: `Got request ${JSON.stringify(req.query)}`,
    });

    const result = await client.getSalariesByJob(occupancy);
    //if result.salaries.length;
    if (result.salaries.length) {
      res.status(200).send({
        message: 'Users retrieved successfully.',
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
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const existingUser = { ...req.body } as unknown as Login;
    console.log({
      location: 'users.controller',
      info: `Got request ${JSON.stringify(req.body)} in loginUser`,
    });

    const result = await client.loginUser(existingUser);
    if (result) {
      res.status(200).send({
        message: 'User logged in successfully.',
        success: true,
        user: result,
      });
    } else {
      res.status(404).send({
        message: `User with that email or password does not exist.`,
        success: false,
      });
    }
  } catch (error: unknown) {
    res.status(500).send({
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}

export async function createNewUser(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const newUser = { ...req.body } as unknown as NewUserRequest;
    console.log({
      location: 'users.controller.createNewUser',
      info: `Got request ${JSON.stringify(req.query)}`,
    });

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
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const updatedUser = { ...req.body } as unknown as UpdateRequest;
    console.log({
      location: 'users.controller',
      info: `Got request ${JSON.stringify(req.body)}`,
    });

    const result = await client.updateUser(updatedUser);
    if (result && result.modifiedCount > 0) {
      res.status(200).send({
        message: 'User updated successfully.',
        success: true,
        request: req.body,
      });
    } else if (result && result.matchedCount === 0) {
      res.status(404).send({
        message: `User with id "${req.body._id}" was not found.`,
        success: false,
      });
    } else {
      res.status(500).send({
        message: 'A server side error ocurred. Please try again.',
        success: false,
        query: `${JSON.stringify(req.body)}`,
      });
    }
  } catch (error: unknown) {
    res.status(500).send({
      message: 'A server side error ocurred. Please try again.',
      success: false,
      error: error,
      query: `${JSON.stringify(req.body)}`,
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const client = new UsersDatabase();
  try {
    const email = req.query.email as string;
    console.log({
      location: 'users.controller',
      info: `Got request ${JSON.stringify(req.query)}`,
    });

    const result = await client.deleteUser(email);
    if (result) {
      res.status(200).send({
        message: 'User deleted successfully.',
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
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}
