import http from "../http_common";

export async function getById(id) {
  return http.get(`/users/${id}`);
}

export async function updateUserService(payload) {
    return http.put(`/users/${payload.id}`, payload);
}