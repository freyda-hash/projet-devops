import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/api/auth/register", credentials);
  },
  login(credentials) {
    return Api().post("/api/auth/login", credentials);
  },
  verifyPassword(currentPassword) {
    return Api().get(`/api/auth/verifyPassword/${currentPassword}`);
  },
  updatePassword(credentials) {
    return Api().post("/api/auth/updatePassword", credentials);
  },
  requestPasswordToken(credentials) {
    return Api().post("/api/auth/requestPasswordToken", credentials);
  },
  verifyPasswordToken(token) {
    return Api().get(`/api/auth/verifyPasswordToken/${token}`);
  },
  resetPassword(credentials) {
    return Api().post("/api/auth/resetPassword", credentials);
  },
};
