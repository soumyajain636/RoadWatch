export const AUTH = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  PROFILE: "/auth/profile",
};

export const REPORTS = {
  CREATE: "/reports",
  ALL: "/reports",
  MY_REPORTS: "/reports/my-reports",
  NEARBY: "/reports/nearby",
  BY_ID: (id) => `/reports/${id}`,
  UPDATE: (id) => `/reports/${id}`,
  DELETE: (id) => `/reports/${id}`,
  VERIFY: (id) => `/reports/${id}/verify`,
  RESOLVE: (id) => `/reports/${id}/resolve`,
};

export const ADMIN = {
  DASHBOARD: "/admin/dashboard",
  REPORTS: "/admin/reports",
  REPORT_BY_ID: (id) => `/admin/reports/${id}`,
  VERIFY_REPORT: (id) => `/admin/reports/${id}/verify`,
  RESOLVE_REPORT: (id) => `/admin/reports/${id}/resolve`,
  DELETE_REPORT: (id) => `/admin/reports/${id}`,
};

export const USERS = {
  ALL: "/admin/users",
  DELETE: (id) => `/admin/users/${id}`,
};