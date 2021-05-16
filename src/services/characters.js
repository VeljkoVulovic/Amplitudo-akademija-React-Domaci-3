import axiosInstance from "./axios";

export const getAllCharacters = () => {
  return axiosInstance.get("people", {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const deleteCharacter = (characterId) => {
  return axiosInstance.delete(`people/${characterId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const getCharacter = (characterId) => {
  return axiosInstance.get(`people/${characterId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const addCharacter = (data) => {
  return axiosInstance.post(`people`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const editCharacter = (data) => {
  return axiosInstance.put(`people`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
