import axiosInstance from './axiosInstance.js'
import { USERS } from '../utils/endpoints.js'

export const userService = {
  getAll: (params) => axiosInstance.get(USERS.ALL, { params }),
  getById: (id) => axiosInstance.get(USERS.BY_ID(id)),
  remove: (id) => axiosInstance.delete(USERS.DELETE(id)),
}
