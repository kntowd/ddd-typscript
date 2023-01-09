import { User, UserName, UsersService } from "./user";
import { UserRegisterCommand } from "./user.command";
import { UsersRepository } from "./users.repository";

export class UserResisterService {
  usersRepository: UsersRepository;
  usersService: UsersService;

  constructor(usersRepository: UsersRepository, usersService: UsersService) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
  }

  async handle(command: UserRegisterCommand) {
    const userName = new UserName(command.name);
    const user = new User(userName);

    const isExists = await this.usersService.exists(user);

    if (isExists) {
      throw new Error("ユーザはすでに存在しています");
    }

    this.usersRepository.save(user);
  }
}
