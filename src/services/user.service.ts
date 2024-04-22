import { UserRepository } from "../repositories/users.repository.js";
import { UserEntity } from "../schemas/user.entity.js";

export const UserService = {
  getAll: async (): Promise<UserEntity[]> => {
    return await UserRepository.getAll()
  },
  getOneById: async (userId: string): Promise<UserEntity> => {
    return await UserRepository.getOne(userId);
  },
  create: async (): Promise<UserEntity> => {
    return await UserRepository.create();
  },
  authenticate: async (userId: string): Promise<boolean> => {
    const user = await UserRepository.getOne(userId);
    return !!user; // Return true if user exists, false otherwise
  }
}