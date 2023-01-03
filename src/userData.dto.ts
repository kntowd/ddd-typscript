import { User } from "./user";

// クライアントにドメインオブジェクトを公開しないためのDTO
export class UserData {
  id: string;
  name: string;

  /* 
    パラメータ毎ではなくUserインスタンスを受け取ることによって
    パラメータが増減してもDTOへの詰め替え処理を変更しなくても良くなる 
  */
  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name.value;
  }
}
