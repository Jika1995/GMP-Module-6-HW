import { NextFunction, Request, Response } from "express";
import { UserService } from "services/user.service";
import { sendError } from "utils/utils";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.get('x-user-id');
  if (!userId) {
    sendError(res, 403, "You must be authorized user: missing field in header 'x-user-id'")
  } else if (userId === 'admin') {
    return next(); // Allow access for admin
  } else {
    // Check if the user with the provided ID exists
    try {
      const isAuthenticated = await UserService.authenticate(userId);
      if (!isAuthenticated) {
        sendError(res, 401, `User with id ${ userId } is not authorized`);
      }
      next(); // Allow access if user exists
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  }

  next();
}