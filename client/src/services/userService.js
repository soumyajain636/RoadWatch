import axiosInstance from "./axiosInstance";
import { USERS } from "../utils/endpoints";

export const userService = {
  getAll: (params) => axiosInstance.get(USERS.ALL, { params }),

  remove: (id) => axiosInstance.delete(USERS.DELETE(id)),
};