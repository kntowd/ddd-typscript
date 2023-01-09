import { PrismaClient } from "@prisma/client";
import { UsersService } from "./user";
import { UserRegisterCommand } from "./user.command";
import { UserResisterService } from "./userResisterService";
import { UsersRepository } from "./users.repository";

const main = async () => {
  const dbClient = new PrismaClient();

  const repository = new UsersRepository(dbClient);
  const service = new UsersService(repository);
  const userResisterService = new UserResisterService(repository, service);

  const userRegisterCommand = new UserRegisterCommand("kenji");
  await userResisterService.handle(userRegisterCommand);
};

main();
