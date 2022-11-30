const getUser = async (username) => {
  return fetch(`http://localhost:3001/users/${username}`)
    .then((res) => res.json())
    .then((data) => data);
};

export default getUser;
