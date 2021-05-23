import axiosInstance from "./axios";

export const getAllMovies = (page, size) => {
  return axiosInstance.get("movies?page=" + page + "&size=" + size, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const deleteMovie = (movieId) => {
  return axiosInstance.delete(`movies/${movieId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const getMovie = (movieId) => {
  return axiosInstance.get(`movies/${movieId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const addMovie = (data) => {
  return axiosInstance.post(`movies`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const editMovie = (data) => {
  return axiosInstance.put(`movies`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const countMovies = () => {
  return axiosInstance.get("movies/count", {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
