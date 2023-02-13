import { useEffect } from "react";
import { checkLoginToken } from "../util/login";

export function useAuth(user, setUser) {
  useEffect(() => {
    checkLoginToken(setUser);
  }, [setUser]);
}
