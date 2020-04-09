import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Pagination from "../../components/posts/Pagination";

function PaginationContainer({ location }) {
  const lastPage = useSelector(({ posts }) => posts.lastPage);
  const { username, page = 1, tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      username={username}
      tag={tag}
      page={parseInt(page)}
      lastPage={lastPage}
    />
  );
}

export default withRouter(PaginationContainer);
