import { users } from "../db/user";
import { UsersService } from "./user";
import { UserDeleteCommand, UserRegisterCommand } from "./user.command";
import { UserDeleteService } from "./userDeleteService";
import { UserResisterService } from "./userResisterService";
import { UsersRepository } from "./users.repository";

const main = () => {
  const repository = new UsersRepository();
  const service = new UsersService(repository);
  const userResisterService = new UserResisterService(repository, service);
  const userDeleteService = new UserDeleteService(repository);

  const userRegisterCommand = new UserRegisterCommand("kenta");
  userResisterService.handle(userRegisterCommand);

  const userDeleteCommand = new UserDeleteCommand("id1");
  userDeleteService.handle(userDeleteCommand);

  console.log(users);
};

main();
