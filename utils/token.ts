import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export const getUserID = () => {
  const token = SecureStore.getItem("session");
  if (!token) {
    throw Error;
  }
  const tokenDecoded = jwtDecode(token) as { [key: string]: any };

  const userId =
    tokenDecoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  return Number(userId);
};

export const getUserRole = () => {
  const token = SecureStore.getItem("session");
  if (!token) {
    throw Error;
  }
  const tokenDecoded = jwtDecode(token) as { [key: string]: any };

  const userRole =
    tokenDecoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  return userRole;
};
