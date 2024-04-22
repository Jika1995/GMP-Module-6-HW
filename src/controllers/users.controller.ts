import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { MyCustomError } from "../utils/customError.js";
import { sendError, sendOk } from "../utils/utils.js";

export const UserController = {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserService.getAll();
      sendOk(res, 200, users);
    } catch (error) {
      console.error('Error fetching users:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  getUserById: async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
      const user = await UserService.getOneById(userId);
      sendOk(res, 200, user);
    } catch (error) {
      console.error(`Error fetching user with id ${ userId }:`, error);
      if (error instanceof MyCustomError) {
        sendError(res, error.status, error.message);
      } else {
        sendError(res, 500, 'Internal Server Error');
      }
    }
  },
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser = await UserService.create();
      sendOk(res, 201, newUser)
    } catch (error) {
      console.error('Error creating user:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  }
}