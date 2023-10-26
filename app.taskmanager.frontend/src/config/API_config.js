const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = (data) => {
  return { url: "/api/login", method: "post", data: data, baseURL: BASE_URL };
};
export const signUp = (data) => {
  return { url: "/api/signup", method: "post", data: data, baseURL: BASE_URL };
};
export const getAllTask = () => {
  return {
    url: "/api/tasks",
    method: "get",
    baseURL: BASE_URL,
  };
};
export const addTask = (data) => {
  return {
    url: "/api/tasks/addTask",
    method: "post",
    data: data,
    baseURL: BASE_URL,
  };
};
export const updateTask = (data) => {
  return {
    url: `/api/tasks/updateTask/${data.id}`,
    method: "put",
    data: data,
    baseURL: BASE_URL,
  };
};

export const deleteTask = (id) => {
  return {
    url: `/api/tasks/deleteTask/${id}`,
    method: "delete",
    baseURL: BASE_URL,
  };
};
