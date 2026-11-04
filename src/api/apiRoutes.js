const routes = {
  login: '/auth/login',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgotPassword',
  verifyRecovery: '/auth/recovery/verify',
  requestRecovery: '/auth/recovery/request',
  recoveryCode: '/auth/recovery/code',
  me: '/auth/me',

  users: '/auth/users',
  deleteUser: (id) => `/auth/users/${id}`,

  editProfile: (id) => `/auth/users/profile/${id}`,
  changePassword: '/auth/users/changePassword',

  submitComplain: '/complain/submitComplain',
  fetchAllComplain: '/complain/fetchAllComplain',
  fetchComplain: '/complain/fetchComplain',
  deleteComplain: (id) => `/complain/deleteComplain/${id}`,
  replyComplain: (id) => `/complain/replyComplain/${id}`,

  submitReport: (id) => `/reports/submitReport/${id}`,
  fetchReport: '/reports/fetchReport',
  fetchAllReport: '/reports/fetchAllReport',
  deleteReport: (id) => `/reports/deleteReport/${id}`,
  remarkReport: (id) => `/reports/remarks/${id}`,

  createReportSlot: '/reportSlot/createReportSlot',
  fetchReportSlot: '/reportSlot/',
  deleteReportSlot: (id) => `/reportSlot/${id}`,

  createResource: '/library/createResource',
  fetchResources: '/library/fetchResource',
  deleteResource: (id) => `/library/deleteResource/${id}`,

  createExam: '/schedule/request',
  fetchExams: '/schedule/',

  createLecture: '/lecture/request',
  fetchLectures: '/lecture/',

  createCasual: '/casual/request',
  fetchCasualAccpet: '/casual/accept',
  fetchCasual: '/casual/',

  updateRequest: (id, update) => `/casual/update/${id}/${update}`,

  slotRequest: '/slot/request',
  fetchSlotRequests: '/slot/',

  slotUpdate: (id, update) => `/slot/update/${id}/${update}`,
  fetchmatches: '/slot/accepted',

  deleteSchedule: (id) => `/casual/deleteSchedule/${id}`,
  dropScheduleMatch: (id) => `/slot/dropRequest/${id}`,

  AdminFetchExams: '/schedule/adminFetchExam',

  fetchNotifications: (UserRole) => `/notifications/fetchNotification?role=${UserRole}`,
  readNotifications: (UserRole) => `/notifications/readNotification?role=${UserRole}`,
};

export default routes;
