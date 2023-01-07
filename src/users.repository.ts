import { createUser, findUser, updateUser, UserDataModel } from "../db/user";
import { User, UserId, UserName } from "./user";

export class UsersRepository {
  public save(user: User) {
    const foundUser = findUser(user.id.value);
    if (foundUser == null) {
      const data = this.toDataModel(user);
      createUser(data);
    } else {
      const data = this.transfer(user, foundUser);
      updateUser(data);
    }
    createUser(this.toDataModel(user));
  }

  public find(id: UserId): User | null {
    const user = findUser(id.value);
    if (user == null) {
      return null;
    }
    return this.toModel(user);
  }

  private transfer(from: User, model: UserDataModel) {
    model.id = from.id.value;
    model.name = from.name.value;
    return model;
  }

  private toModel(from: UserDataModel): User {
    return new User(new UserName(from.name), { id: new UserId(from.id) });
  }

  private toDataModel(from: User): UserDataModel {
    return {
      id: from.id.value,
      name: from.name.value,
    };
  }
}
