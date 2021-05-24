import axios from "axios";

export const login = (data) => {
  return axios({
    method: "POST",
    baseURL: "http://localhost:8080/api/",
    url: "/authenticate",
    data: data,
  });
};

export const register = (data) => {
  return axios({
    method: "POST",
    baseURL: "http://localhost:8080/api/",
    url: "/register",
    data: data,
  });
};

export const account = () => {
  return axios({
    method: "GET",
    baseURL: "http://localhost:8080/api/",
    url: "/account",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
