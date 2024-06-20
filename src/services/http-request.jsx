/* eslint-disable no-undef */

import { getCookie } from "../utils/setCookie";

const apiUrl = process.env.REACT_APP_BASE_URL;
const loggedInToken = getCookie("token");

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
