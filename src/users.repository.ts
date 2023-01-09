import { User, UserId, UserName } from "./user";

import { PrismaClient, User as UserDataModel } from "@prisma/client";

export class UsersRepository {
  private dbClient: PrismaClient;

  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  public async save(user: User) {
    const data = this.toDataModel(user);
    await this.dbClient.user.create({
      data,
    });
  }

  public async update(user: User) {
    const foundUser = await this.dbClient.user.findUnique({
      where: {
        name: user.id.value,
      },
    });

    if (foundUser == null) throw new Error("ユーザが存在しません");

    const data = this.transfer(user, foundUser);

    await this.dbClient.user.update({
      data,
      where: {
        id: user.id.value,
      },
    });
  }

  public async find(id: UserId): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({
      where: {
        id: id.value,
      },
    });
    if (user == null) {
      return null;
    }
    return this.toModel(user);
  }

  public async findByName(name: UserName): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({
      where: {
        name: name.value,
      },
    });
    if (user == null) {
      return null;
    }
    return this.toModel(user);
  }

  public async delete(id: UserId) {
    this.dbClient.user.delete({
      where: { id: id.value },
    });
  }

  private transfer(from: User, model: UserDataModel): UserDataModel {
    model.id = from.id.value;
    model.email = from.email?.value || null;
    model.name = from.name.value;
    return model;
  }

  // データモデルをドメインモデルに変換
  private toModel(from: UserDataModel): User {
    return new User(new UserName(from.name), { id: new UserId(from.id) });
  }

  // ドメインモデルをデータモデルに変換
  private toDataModel(from: User): UserDataModel {
    return {
      id: from.id.value,
      email: from.email?.value || null,
      name: from.name.value,
    };
  }
}
