const users = [
    {
      username: 'user1',
      password: 'password1',
    },
    {
      username: 'user2',
      password: 'password2',
    },
  ];
  
  const getUser = (username, password) => {
    return users.find((user) => user.username === username && user.password === password);
  };
  
  module.exports = {
    getUser,
  };