// クライアントにドメインオブジェクトを公開しないためのDTO
export class UserData {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
