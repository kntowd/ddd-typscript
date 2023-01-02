const { UserId } = require("./user");
const { User } = require("./user");

const check = () => {
  const user1Id = new UserId("user1Id");
  const user1 = new User(user1Id, "kenta");

  const user2Id = new UserId("user1Id");
  const user2 = new User(user2Id, "kenta");

  console.log(user1.equals(user2));
};

check();
