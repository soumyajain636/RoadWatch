export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
}

export const REPORTS = {
  CREATE: '/reports',
  ALL: '/reports',
  MY_REPORTS: '/reports/my-reports',
  NEARBY: '/reports/nearby',
  BY_ID: (id) => `/reports/${id}`,
  UPDATE: (id) => `/reports/${id}`,
  DELETE: (id) => `/reports/${id}`,
  VERIFY: (id) => `/reports/${id}/verify`,
  RESOLVE: (id) => `/reports/${id}/resolve`,
}