import client from "./client";

export const write = ({
  rootPostId,
  rootCommentId,
  body,
  username,
  password,
}) =>
  client.post("/api/comment", {
    rootPostId,
    ...(rootCommentId ? { rootCommentId } : {}),
    body,
    ...(username ? { username, password } : {}),
  });

export const remove = ({ id, password }) =>
  client.delete(`/api/comment/${id}`, { data: { password } });
