import API_URL from "./env";

const checkLoginToken = async (setUser) => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch(`${API_URL}/verify-token`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          getUser(data.user.username).then((user) => {
            setUser({
              id: user._id,
              username: user.username,
              email: user.email,
              password: user.password,
              transactions: user.transactions,
              categories: user.categories,
              loggedIn: true,
            });
            localStorage.setItem("user", user);
          });
        }
      });
  }
};

const getUser = async (username) => {
  return fetch(`${API_URL}/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        return data.user;
      }
    });
};

export { checkLoginToken, getUser };
