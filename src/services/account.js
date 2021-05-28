import axios from "axios";

export const login = (data) => {
  return axios({
    method: "POST",
    baseURL: "http://localhost:8080/api/",
    url: "/authenticate",
    data: data,
  });
};

export const registerUser = (data) => {
  const newData = { authorities: ["ROLE_USER"], langKey: "en", ...data };
  console.log(newData);
  return axios({
    method: "POST",
    baseURL: "http://localhost:8080/api/",
    url: "/register",
    data: newData,
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
