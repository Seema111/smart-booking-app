import { toast } from "react-toastify";
import { deleteCookie } from "./setCookie";

/**
 * @description Verifies if the HTTP response is successful and if the user is logged
 * in. If not, it handles authentication failures and logs out the user.
 * 
 * @param { object } response - network response from the server, which the function
 * checks for errors and handles accordingly.
 */
export const validateResponse = (response) => {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      toast.error("Authorization Access not granted for the user.");
      deleteCookie("token");
      deleteCookie("username");
      localStorage.removeItem("book-detail");
      toast.success("Logged out successfully!");
      window.location.replace("/login");
    } else {
      // Handle other errors
      throw new Error("Network response failed");
    }
  }
};
