import { UserEntity } from "schemas/user.entity";
import { readFileSync, writeFileSync } from 'fs';
import { randomUUID } from "crypto";

let users: UserEntity[] = loadUsers();

function loadUsers(): UserEntity[] {
  try {
    const data = readFileSync('src/db/users.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return []
  }
};

function saveUsers() {
  try {
    writeFileSync("src/db/users.json", JSON.stringify(users), "utf-8")
    console.log(`User saved successfully!`)
  } catch (error) {
    console.log(`Error : ${ error }`)
  }
};

export const getUsers = async (): Promise<UserEntity[]> => {
  const users = await loadUsers()
  return users;
}

export const getUserById = async (userId: string) => {
  const users = await loadUsers();
  const user = users.find((u: UserEntity) => u.id === userId);
  if (!user) {
    throw new Error(`User with this id: ${ userId } not found`)
  }
  return user;
};

export const createUser = async () => {
  const newUser = {
    id: randomUUID()
  };

  const users = await getUsers();
  users.push(newUser);
  saveUsers()
};

