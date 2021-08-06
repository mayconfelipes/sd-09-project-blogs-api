const removeUsersPassword = (usersData) => {
  const users = usersData.map(({ id, displayName, email, image }) => ({
    id,
    displayName,
    email,
    image,
  }));
  console.log(users);
  return users;
};

module.exports = removeUsersPassword;
