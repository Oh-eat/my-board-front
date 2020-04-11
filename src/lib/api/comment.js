import client from "./client";

export const write = ({
  rootPostId,
  rootCommentId,
  body,
  username,
  password,
}) =>
  client.post("/api/comments", {
    rootPostId,
    ...(rootCommentId ? { rootCommentId } : {}),
    body,
    ...(username ? { username, password } : {}),
  });

export const remove = ({ id, password }) =>
  client.delete(`/api/comments/${id}`, { data: { password } });
