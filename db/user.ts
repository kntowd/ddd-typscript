export interface UserDataModel {
  id: string;
  name: string;
}

const users: { id: string; name: string }[] = [];

export const createUser = (user: UserDataModel) => {
  users.push(user);
};

export const updateUser = (user: UserDataModel) => {
  const foundUser = findUser(user.id);
  if (foundUser == null) {
    throw new Error("更新するユーザが存在しません");
  }

  return users.map((user) => {
    if (user.id === foundUser.id) {
      return user;
    }
  });
};

export const findUser = (id: string) => {
  return users.find((user) => user.id === id);
};
