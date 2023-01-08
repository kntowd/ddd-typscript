import { User, UserEmail, UserId, UserName, UsersService } from "./user";
import { UserDeleteCommand, UserUpdateCommand } from "./user.command";
import { UserData } from "./userData.dto";
import { UsersRepository } from "./users.repository";

export class UserApplicationService {
  private usersRepository: UsersRepository;
  private usersService: UsersService;

  constructor(usersRepository: UsersRepository, usersService: UsersService) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
  }

  get(userId: string) {
    const targetId = new UserId(userId);
    const user = this.usersRepository.find(targetId);

    if (user == null) return null;

    // ドメインオブジェクトをクライアントに公開しないようにDTOへ詰め替え
    return new UserData(user);
  }

  register(name: string) {
    const user = new User(new UserName(name));
    this.usersRepository.save(user);
  }

  update(command: UserUpdateCommand) {
    const targetId = new UserId(command.id);
    const user = this.usersRepository.find(targetId);

    if (user == null) throw new Error("更新するユーザが見つかりません");

    const name = command.name;
    if (name != null) {
      const newUserName = new UserName(name);
      user.changeUserName(newUserName);
      if (this.usersService.exists(user)) {
        throw new Error("ユーザはすでに存在しています");
      }
    }

    const email = command.email;
    if (email != null) {
      const newEmail = new UserEmail(email);
      user.changeUserEmail(newEmail);
    }

    this.usersRepository.save(user);
  }

  delete(command: UserDeleteCommand) {
    const targetId = new UserId(command.id);
    const user = this.usersRepository.find(targetId);

    if (user == null) throw new Error("削除するユーザが見つかりません");

    this.usersRepository.delete(user.id);
  }
}
