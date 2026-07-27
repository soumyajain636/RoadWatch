import axiosInstance from './axiosInstance.js'
import { AUTH } from '../utils/endpoints.js'

export const authService = {
  register: (payload) => axiosInstance.post(AUTH.REGISTER, payload),
  login: (payload) => axiosInstance.post(AUTH.LOGIN, payload),
  getCurrentUser: () => axiosInstance.get(AUTH.PROFILE),
}