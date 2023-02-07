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
        console.log(data.user);
        if (data.user) {
          setUser({
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
            password: data.user.password,
            loggedIn: true,
            transactions: data.user.transactions,
            categories: data.user.categories,
          });
          localStorage.setItem("user", data.user);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      });
  }
};
const getUser = async (username) => {
  return fetch(`${API_URL}/users/${username}`)
    .then((res) => res.json())
    .then((data) => data);
};

export { checkLoginToken, getUser };
