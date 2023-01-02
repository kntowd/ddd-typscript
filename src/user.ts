import { UsersRepository } from "./users.repository";

const _ = require("lodash");

// 値オブジェクト
export class UserId {
  readonly value: string;

  constructor(value: string) {
    if (value == null) throw new Error("idを入力してください");

    this.value = value;
  }
}

export class UserName {
  readonly value: string;

  constructor(value: string) {
    if (value == null) throw new Error("名前を入力してください");
    if (value.length < 3) throw new Error("名前は３文字以上にしてください");

    this.value = value;
  }
}

// エンティティ
export class User {
  readonly id: UserId;
  name: UserName;

  constructor(id: UserId, name: UserName) {
    if (id == null) throw new Error("idを入力してください");
    if (name == null) throw new Error("名前を入力してください");

    this.id = id;
    this.name = name;
  }

  public changeUserName(name: string): void {
    this.name = new UserName(name);
  }

  public equals(other: User) {
    if (null === other) return false;
    if (this === other) return true;
    return _.isEqual(this.id, other.id);
  }
}

// ドメインサービス
export class UsersService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public exists(user: User) {
    const foundUser = this.usersRepository.find(user.id);
    return foundUser != null;
  }
}
