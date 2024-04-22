import { UserEntity } from '../schemas/user.entity.js';
import { readFile, writeFile } from 'fs/promises';
import { randomUUID } from "crypto";
import { MyCustomError } from '../utils/customError.js';

const USERS_FILE_PATH = 'src/db/users.json';

async function loadUsers(): Promise<UserEntity[]> {
  try {
    const data = await readFile(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading products:', err);
    return [];
  }
};

async function saveUsers(users: UserEntity[]): Promise<void> {
  try {
    await writeFile(USERS_FILE_PATH, JSON.stringify(users), "utf-8")
    console.log(`User saved successfully!`)
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

export const UserRepository = {
  getAll: async (): Promise<UserEntity[]> => {
    const users = await loadUsers()
    return users;
  },
  getOne: async (userId: string): Promise<UserEntity> => {
    const users = await loadUsers();
    const user = users.find((u: UserEntity) => u.id === userId);
    if (!user) {
      throw new MyCustomError(404, `User is not authorized. User with this id: ${ userId } not found`);
    }
    return user;
  },
  create: async (): Promise<UserEntity> => {
    const newUser = {
      id: randomUUID()
    };

    try {
      const users = await loadUsers();
      users.push(newUser);
      await saveUsers(users);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Propagate the error to the caller
    }
  },
}

