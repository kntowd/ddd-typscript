import { UsersRepository } from "./users.repository";

import * as _ from "lodash";
import { v4 as uuid } from "uuid";

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
    if (value.length > 20) throw new Error("名前は20文字以下にしてください");

    this.value = value;
  }
}

export class UserEmail {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}

// エンティティ
export class User {
  name: UserName;
  id: UserId;
  email: UserEmail;

  constructor(name: UserName, id?: UserId, email?: UserEmail) {
    if (name == null) throw new Error("名前を入力してください");
    if (id == null) {
      this.id = new UserId(uuid());
    } else {
      this.id = id;
    }
    if (email != null) {
      this.email = email;
    }
    this.name = name;
  }

  public changeUserName(name: UserName): void {
    this.name = name;
  }

  public changeUserEmail(email: UserEmail) {
    this.email = email;
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
    const duplicatedUser = this.usersRepository.find(user.name);
    return duplicatedUser != null;
  }
}
