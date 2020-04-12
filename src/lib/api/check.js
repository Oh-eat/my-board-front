import client from "./client";

export const checkPostWrite = ({ username, password }) =>
  client.post("/api/check/post/write", { username, password });

export const checkPostUpdate = ({ id, password }) =>
  client.post(`/api/check/post/update/${id}`, { password });

export const checkPostDelete = ({ id, password }) =>
  client.post(`/api/check/post/delete/${id}`, { password });

export const checkCommentDelete = ({ id, password }) =>
  client.post(`/api/check/comment/delete/${id}`, { password });
