import axiosInstance from './axiosInstance.js'
import { ADMIN } from '../utils/endpoints.js'
import { userService } from './userService.js'
import { reportService } from './reportService.js'

/**
 * Single import surface for every admin-facing API call. Dashboard stats hit
 * their own endpoint directly; user and report moderation calls are
 * re-exported from userService/reportService rather than duplicated here,
 * so there is exactly one axios call per operation no matter which service
 * a component imports from — admin pages are written to only ever import
 * `adminService`.
 */
export const adminService = {
  // Dashboard
  getStats: () => axiosInstance.get(ADMIN.DASHBOARD_STATS),

  // User management (delegates to userService — same underlying calls)
  getUsers: userService.getAll,
  getUserById: userService.getById,
  deleteUser: userService.remove,

  // Report moderation (delegates to reportService — same underlying calls)
  getReports: reportService.getAll,
  getReportById: reportService.getById,
  verifyReport: reportService.verify,
  markReportInProgress: reportService.markInProgress,
  resolveReport: reportService.resolve,
  deleteReport: reportService.remove,
}
