import client from "./client";
import qs from "qs";

export const list = ({ username, tag, page }) => {
  const query = qs.stringify({ username, tag, page });
  return client.get(`/api/posts?${query}`);
};

export const read = (id) => client.get(`/api/posts/${id}`);

export const write = ({ title, body, tags, username, password }) =>
  client.post(`/api/posts`, {
    title,
    body,
    tags,
    ...(username ? { username, password } : {}),
  });

export const update = ({ id, title, body, tags, password }) => {
  return client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
    ...(password ? { password } : {}),
  });
};

export const remove = ({ id, password }) =>
  client.delete(`/api/posts/${id}`, {
    data: password ? { password } : {},
  });
