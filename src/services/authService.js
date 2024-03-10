import axios from "axios";

const registerUser = async (data) => {
  const url = "/api/user";
  return axios.post(url, data);
};

const loginUser = async (data) => {
  const url = "/api/user/login";
  return axios.post(url, data);
};

const verifyUser = async (token) => {
  const url = `/api/user/verify/${token}`;
  return axios.get(url);
};

export const authService = {
  registerUser,
  loginUser,
  verifyUser,
};
