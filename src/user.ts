const _ = require("lodash");

// 値オブジェクト
export class UserId {
  private value: string;

  constructor(value: string) {
    if (value == null) throw new Error("idを入力してください");

    this.value = value;
  }
}

// エンティティ
export class User {
  private id: UserId;
  private name: string;

  constructor(id: UserId, name: string) {
    if (id == null) throw new Error("idを入力してください");
    if (name == null) throw new Error("名前を入力してください");

    this.id = id;
    this.name = name;
  }

  public changeUserName(name: string): void {
    if (name == null) throw new Error("名前を入力してください");
    if (name.length < 3) throw new Error("ユーザ名は三文字以上にしてください");
    this.name = name;
  }

  public equals(other: User) {
    if (null === other) return false;
    if (this === other) return true;
    return _.isEqual(this.id, other.id);
  }
}

// ドメインサービス
export class UserService {
  public exists(user: User) {
    return true;
  }
}
