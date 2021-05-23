import axiosInstance from "./axios";

export const getAllBooks = (page, size) => {
  return axiosInstance.get("books?page=" + page + "&size=" + size, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const deleteBook = (bookId) => {
  return axiosInstance.delete(`books/${bookId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const getBook = (bookId) => {
  return axiosInstance.get(`books/${bookId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const addBook = (data) => {
  return axiosInstance.post(`books`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const editBook = (data) => {
  return axiosInstance.put(`books`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const countBooks = () => {
  return axiosInstance.get("books/count", {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
