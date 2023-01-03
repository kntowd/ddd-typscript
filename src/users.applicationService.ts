import { User, UserId, UserName } from "./user";
import { UserData } from "./userData.dto";
import { UsersRepository } from "./users.repository";

export class UserApplicationService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  get(userId: string) {
    const targetId = new UserId(userId);
    const user = this.usersRepository.find(targetId);

    if (user == null) return null;

    // dtoに詰め替え
    return new UserData(user.name.value, user.id.value);
  }

  register(name: string) {
    const user = new User(new UserName(name));
    this.usersRepository.save(user);
  }
}