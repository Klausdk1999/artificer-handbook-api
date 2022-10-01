import prisma  from '../config/database';
import { CreateUserData } from '../services/userService';

async function findById(id: number) {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
}
async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

async function insert(createUserData: CreateUserData) {
  return prisma.user.create({
    data: createUserData
  });
}

export default {
  findByEmail,
  findById,
  insert
};
