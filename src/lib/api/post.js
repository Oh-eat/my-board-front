import client from "./client";
import qs from "qs";

export const list = ({ username, tag, page }) => {
  const query = qs.stringify({ username, tag, page });
  return client.get(`/api/posts?${query}`);
};

export const read = (id) => client.get(`/api/posts/${id}`);

export const write = ({ title, body, tags }) =>
  client.post(`api/posts`, { title, body, tags });

export const update = ({ id, title, body, tags }) =>
  client.patch(`api/posts/${id}`, { title, body, tags });

export const remove = (id) => client.delete(`api/posts/${id}`);
