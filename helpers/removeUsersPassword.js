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

/* const a = [
  {
    id: 1,
    displayName: "Rubinho Barrichello",
    email: "rubinho@gmail.com",
    password: "123456",
    image: "https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg"
  },
];

removeUsersPassword(a); */
module.exports = removeUsersPassword;
