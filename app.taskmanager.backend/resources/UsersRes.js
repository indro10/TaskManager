//add resources with setters and getters
let Users = [
  {
    id: 1,
    email: "mike@gmail.com",
    password: "mike_pass",
    name: "MIKE GILL",
  },
];

const setUsers = (users) => {
  Users = users;
};
const getUsers = () => {
  return Users;
};

module.exports.getUsers = getUsers;
module.exports.setUsers = setUsers;
