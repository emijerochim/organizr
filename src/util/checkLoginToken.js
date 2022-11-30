const checkLoginToken = async (setUser) => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    fetch("http://localhost:3001/verify-token", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setUser({ ...data.user, loggedIn: true, token: localToken });
        }
      });
  }
};

module.exports = checkLoginToken;
