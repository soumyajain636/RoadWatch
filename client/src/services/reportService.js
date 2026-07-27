import axiosInstance from './axiosInstance.js'
import { REPORTS } from '../utils/endpoints.js'

export const reportService = {
  create: (formData) =>
    axiosInstance.post(REPORTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  update: (id, formData) =>
    axiosInstance.put(REPORTS.UPDATE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  getAll: (params) => axiosInstance.get(REPORTS.ALL, { params }),

  getMine: (params) => axiosInstance.get(REPORTS.MY_REPORTS, { params }),

  getNearby: (params) => {
    console.log("reportService params:", params)

    return axiosInstance.get(REPORTS.NEARBY, {
      params,
    })
  },

  getById: (id) => axiosInstance.get(REPORTS.BY_ID(id)),

  remove: (id) => axiosInstance.delete(REPORTS.DELETE(id)),

  verify: (id) => axiosInstance.put(REPORTS.VERIFY(id)),

  resolve: (id) => axiosInstance.put(REPORTS.RESOLVE(id)),
}