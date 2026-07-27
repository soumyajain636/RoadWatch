import axiosInstance from "./axiosInstance";
import { ADMIN, USERS } from "../utils/endpoints";

export const adminService = {
  getStats: () => axiosInstance.get(ADMIN.DASHBOARD),

  getUsers: (params) => axiosInstance.get(USERS.ALL, { params }),

  deleteUser: (id) => axiosInstance.delete(USERS.DELETE(id)),

  getReports: () => axiosInstance.get(ADMIN.REPORTS),

  getReportById: (id) =>
    axiosInstance.get(ADMIN.REPORT_BY_ID(id)),

  verifyReport: (id) =>
    axiosInstance.put(ADMIN.VERIFY_REPORT(id)),

  resolveReport: (id) =>
    axiosInstance.put(ADMIN.RESOLVE_REPORT(id)),

  deleteReport: (id) =>
    axiosInstance.delete(ADMIN.DELETE_REPORT(id)),

  updateStatus: (id, status) =>
  axiosInstance.put(
    ADMIN.STATUS(id),
    { status }
  ),
};