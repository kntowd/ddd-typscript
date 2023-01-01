// 値オブジェクト
class UserId {
  private value: string;

  constructor(value: string) {
    if (value == null) throw new Error("名前にnullは登録できません");

    this.value = value;
  }
}
