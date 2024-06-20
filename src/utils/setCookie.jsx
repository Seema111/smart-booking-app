// Helper function to set cookie

/**
 * @description Sets a cookie with a specified name, value, and expiration date in
 * milliseconds from the current time.
 * 
 * @param { string } name - name of a cookie, which is then set as the value of the
 * `cookie` property in the output document.
 * 
 * @param { string } value - value to be stored in the cookie, which will be stored
 * along with the name and expiration time in the cookie.
 * 
 * @param { integer } days - number of days to add to the current date before setting
 * the expiration time for a cookie.
 */

export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};


/**
 * @description Sets a cookie named `name` to an empty value, indicating it has been
 * deleted, using the `document.cookie` property. The cookie will expire on January
 * 1, 1970, at midnight UTC, and have the path `/`.
 * 
 * @param { string } name - name of the cookie to be set, which is then assigned to
 * the `cookie` property using the `=` operator.
 */

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


/**
 * @description Takes a `name` parameter and returns the value of a cookie with the
 * specified name, or an empty string if no such cookie exists.
 * 
 * @param { string } name - variable or value for which the cookies are being searched,
 * and it is used to determine whether a specific cookie value exists among the stored
 * cookies in the browser.
 * 
 * @returns { string } the value of a cookie with the specified name, or an empty
 * string if no such cookie exists.
 */

export const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return '';
};