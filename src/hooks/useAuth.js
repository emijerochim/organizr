import { useEffect } from "react";
import { checkLoginToken, getUser } from "../routes/Login/loginFunctions";

export function useAuth(username, setUser) {
  useEffect(() => {
    checkLoginToken(setUser);
    if (username) {
      getUser(username).then((data) => {
        setUser((prevState) => {
          return {
            ...prevState,
            transactions: data[0].transactions,
            categories: data[0].categories,
          };
        });
      });
    }
  }, [username, setUser]);
}
