/* eslint-disable no-undef */

import { getCookie } from "../utils/setCookie";

const apiUrl = process.env.REACT_APP_BASE_URL;
const loggedInToken = getCookie("token");

/**
 * @description Async makes a POST request to `${apiUrl}/account/login/` with the
 * provided `body` as the request body, using JSON serialization.
 * 
 * @param { object } body - login data for an account in JSON format to be sent in a
 * POST request to the API endpoint `${apiUrl}/account/login/`.
 * 
 * @returns { Promise } a JSON response containing the login result.
 */
export const loginUser = async (body) => {
  return await fetch(`${apiUrl}/account/login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Synchronously makes a POST request to the `${apiUrl}/account/register/`
 * endpoint with the given body data as the request body, using `JSON.stringify()`
 * to convert the data to JSON format before sending it in the request body.
 * 
 * @param { object } body - JSON data to be sent in a POST request to the API endpoint
 * for account registration.
 * 
 * @returns { object } a HTTP POST request to the `/account/register/` endpoint.
 */
export const registerUser = async (body) => {
  return await fetch(`${apiUrl}/account/register/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Synchronously generates an OTP and returns it as a JSON response to
 * the client via the API endpoint specified.
 * 
 * @param { object } body - Otp to be generated for the specified user in JSON format,
 * which will be sent to the API endpoint through a POST request.
 * 
 * @returns { OTP (One-Time Password } an OTP generation URL.
 * 
 * 	* `data`: The email content sent to the user's registered email address. It
 * contains an OTP generation link that will reset the user's password. (Type: JSON
 * object)
 */
export const forgotPasswordEmail = async (body) => {
  return await fetch(`${apiUrl}/account/forget-password/generate/otp/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Makes a POST request to the `/account/forget-password/reset/` API
 * endpoint with the provided JSON body data.
 * 
 * @param { object } body - password reset request in JSON format for the forget
 * password functionality provided by the API endpoint.
 * 
 * @returns { HTTP response } a HTTP response object containing information about the
 * password reset process.
 * 
 * 	* `body`: This is the body of the response, which contains the password reset
 * link sent to the user's registered email address.
 * 	* `status`: The HTTP status code of the response, indicating whether the request
 * was successful or not (e.g., 200 for a successful response).
 */
export const forgotPasswordReset = async (body) => {
  return await fetch(`${apiUrl}/account/forget-password/reset/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Fetches user details from the API using a GET request with specified
 * headers and returns the response as an asynchronous promise.
 * 
 * @param { string } username - user name for which the API call will be made.
 * 
 * @returns { Response } a JSON response containing the detailed information of the
 * user.
 * 
 * 	* `data`: The response data is stored in the `data` property. This data contains
 * the details of the user, including their ID, name, email, and more.
 * 	* `status`: The HTTP status code of the response is stored in the `status` property.
 * This can be used to check if the request was successful or not.
 * 	* `headers`: The HTTP headers associated with the response are stored in the
 * `headers` property. These headers can provide additional information about the
 * response, such as the request method, authorization tokens, and more.
 * 	* `config`: The configuration object used to make the API call is stored in the
 * `config` property. This can be useful for debugging purposes or when handling errors.
 */
export const getUserDetail = async (username) => {
  return await fetch(`${apiUrl}/account/user/${username ?? "admin1"}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
  });
};

/**
 * @description Performs a PATCH request to the API endpoint `/account/user/<username>/`
 * with a JSON body representing the updated user details, using the logged-in token
 * for authorization.
 * 
 * @param { string } username - user account whose details are to be updated through
 * the PATCH request sent to the API endpoint.
 * 
 * @param { string } body - JSON data to be patched to the specified user's account.
 * 
 * @returns { object } a response from the API endpoint with the updated user details.
 */
export const updateUserDetail = async ({ username, body }) => {
  return await fetch(`${apiUrl}/account/user/${username ?? "admin1"}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Fetches the Lab Services API endpoint to retrieve a list of all lab
 * services.
 * 
 * @returns { array } a JSON response containing a list of lab services.
 */
export const getAllLabServices = async () => {
  return await fetch(`${apiUrl}/core/lab-services/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });
};

/**
 * @description Fetches all caregivers from a specified API endpoint and returns them
 * as JSON data.
 * 
 * @returns { object } a JSON response containing a list of caregivers.
 */
export const getAllCareGivers = async () => {
  return await fetch(`${apiUrl}/core/care-giver/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });
};

/**
 * @description Synchronously calls the API `/core/care-giver/$uuidOrEmpty/`.
 * 
 * @param { string } uuid - unique identifier of the care giver for whom the API
 * request is made.
 * 
 * @returns { object } a JSON response containing caregiver detail information.
 */
export const getCaregiverDetail = async (uuid) => {
  return await fetch(`${apiUrl}/core/care-giver/${uuid || ""}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });
};

/**
 * @description Async sends a POST request to the API endpoint `/core/book-appointment/`
 * with the body containing appointment details, using the `loggedInToken` for authentication.
 * 
 * @param { object } body - request data for booking an appointment, which is sent
 * to the API endpoint through the `fetch` function.
 * 
 * @returns { Promise } a HTTP POST request to the API endpoint with the provided
 * body data.
 */
export const bookAppointment = async (body) => {
  return await fetch(`${apiUrl}/core/book-appointment/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Makes a POST request to the `/core/appointment/transaction/` API
 * endpoint with a JSON body containing the necessary parameters to initiate a Khalti
 * payment transaction.
 * 
 * @param { object } body - data to be sent as the request body when initiating an
 * appointment transaction via API.
 * 
 * @returns { HTTP response } a JSON response from the API endpoint.
 * 
 * 	* `data`: The response data from the Khalti API, which contains information about
 * the payment initiation.
 * 	* `status`: The status of the payment initiation request, which can be either
 * "success" or "error".
 * 	* `message`: A message indicating the reason for the payment initiation failure,
 * if applicable.
 * 	* `requestId`: A unique identifier for the payment initiation request.
 * 	* `transactionId`: A unique identifier for the transaction.
 */
export const initiateKhaltiPayment = async (body) => {
  return await fetch(`${apiUrl}/core/appointment/transaction/initiate/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Via API endpoint POST requests, using JSON-formatted request bodies
 * and authorizing with a token to verify an appointment transaction.
 * 
 * @param { object } body - application/json body data that is sent to the server
 * through the `fetch` API call for verifying appointments.
 * 
 * @returns { HTTP response } a response from the Khalti API containing the status
 * of the transaction.
 * 
 * 	* `data`: The verification response data, which contains information about the transaction.
 * 	* `status`: The status of the transaction, indicating whether it was successful
 * or not. Possible values include "success", "failure", and "processing".
 * 	* `message`: A message indicating the reason for the transaction's status, provided
 * in case of a failure or processing status.
 * 	* `payment_method`: The payment method used for the transaction, which could be
 * either "khalti" or another payment method.
 * 	* `amount`: The amount of money transacted, represented in the currency of the store.
 * 	* `transaction_id`: A unique identifier for the transaction, used to track and
 * process the payment.
 * 	* `created_at`: The date and time when the transaction was made.
 * 	* `updated_at`: The date and time when the transaction was last processed or updated.
 */
export const verifyKhaltiPayment = async (body) => {
  return await fetch(`${apiUrl}/core/appointment/transaction/verify/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify(body),
  });
};

/**
 * @description Asyncly fetches the user's appointments from the API endpoint `${apiUrl}/core/uer-appointments/`.
 * 
 * @returns { object } a JSON object representing all the user's appointments.
 */
export const getAllMyAppointments = async () => {
  return await fetch(`${apiUrl}/core/uer-appointments/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
  });
};

/**
 * @description Via `fetch()` API request retrieves all chat users' data from a server
 * endpoint.
 * 
 * @returns { object } a JSON object containing a list of chat users.
 */
export const getAllChatUsers = async () => {
  return await fetch(`${apiUrl}/chat/users/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
  });
};

/**
 * @description Via an `async` method fetches data from the API endpoint
 * `${apiUrl}/chat/user/rooms/` and returns it as a promise.
 * 
 * @returns { object } a JSON response containing an array of chat rooms.
 */
export const getAllChatRooms = async () => {
  return await fetch(`${apiUrl}/chat/user/rooms/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
  });
};

/**
 * @description Async calls the GET method on the API endpoint `/chat/room/$uuid/get-message/`
 * and sends a JSON request with the Accept and Content-Type headers set to
 * application/json, along with the Authorization header bearing the logged-in token.
 * 
 * @param { UUID. } uuid - 12-digit unique identifier for a specific chat room, which
 * is used to retrieve messages from that room.
 * 
 * 	* `uuid`: A unique identifier for a chat room, passed as an argument to the function.
 * 
 * @returns { JSON response } a JSON array of chat messages.
 * 
 * 	* `data`: This property contains an array of chat room messages. Each message is
 * represented as an object with the following properties:
 * 		+ `id`: The unique identifier for the message.
 * 		+ `roomUuid`: The UUID of the chat room where the message was posted.
 * 		+ `content`: The text content of the message.
 * 		+ `userName`: The name of the user who posted the message.
 * 		+ `userImageUrl`: The URL of the user's profile image.
 * 		+ `createdAt`: The timestamp when the message was posted, in ISO 8601 format.
 * 		+ `deleted`: Whether the message has been deleted or not.
 * 	* `error`: This property contains an error message if any, indicating a problem
 * with the API call.
 */
export const getAllChatRoomMessages = async (uuid) => {
  return await fetch(`${apiUrl}/chat/room/${uuid}/get-message/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Token ${loggedInToken}`,
    },
  });
};
