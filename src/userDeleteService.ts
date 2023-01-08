import { UserId } from "./user";
import { UserDeleteCommand } from "./user.command";
import { UsersRepository } from "./users.repository";

export class UserDeleteService {
  readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  handle(command: UserDeleteCommand) {
    const userId = new UserId(command.id);
    const user = this.usersRepository.find(userId);

    if (user == null) {
      throw new Error("ユーザが存在しません");
    }
    this.usersRepository.delete(userId);
  }
}
