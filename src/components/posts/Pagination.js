import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const PaginationBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .left {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .center {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .page.now {
      color: dodgerblue;
      text-decoration: underline dodgerblue;
    }

    .page + .page {
      margin-left: 0.5rem;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const buildLink = ({ username, page, tag }) => {
  const query = qs.stringify({ username, page, tag });
  return `/post?${query}`;
};

const getPages = ({ page, lastPage }) => {
  const pageCount = 9;
  const sideCount = Math.floor(9 / 2);

  if (page < 1 || page > lastPage) {
    return [];
  }

  if (lastPage <= pageCount) {
    return [...Array(lastPage).keys()].map((i) => i + 1);
  }

  let leftEnd = page - sideCount;
  let rightEnd = page + sideCount;

  if (leftEnd < 1) {
    leftEnd = 1;
  }

  if (rightEnd > lastPage) {
    leftEnd -= rightEnd - lastPage;
  }

  const pages = [...Array(pageCount).keys()].map((i) => i + leftEnd);
  return pages;
};

function Pagination({ username, page, tag, lastPage }) {
  const pages = getPages({ page, lastPage });

  return (
    <PaginationBlock>
      <div className="left">
        {page !== 1 && (
          <Button
            to={buildLink({ username, page: 1, tag })}
            width="3rem"
            height="2rem"
          >
            처음
          </Button>
        )}
        {!(page - 1 <= 0 || page - 1 > lastPage) && (
          <Button
            to={buildLink({ username, page: page - 1, tag })}
            width="3rem"
            height="2rem"
          >
            이전
          </Button>
        )}
      </div>
      <div className="center">
        {pages.length !== 0 &&
          pages.map((p) => (
            <Link
              key={p}
              className={p === page ? "page now" : "page"}
              to={buildLink({ username, page: p, tag })}
            >
              {p}
            </Link>
          ))}
      </div>
      <div className="right">
        {!(page >= lastPage || page + 1 < 1) && (
          <Button
            to={buildLink({ username, page: page + 1, tag })}
            width="3rem"
            height="2rem"
          >
            다음
          </Button>
        )}
        {page !== lastPage && (
          <Button
            to={buildLink({ username, page: lastPage, tag })}
            width="3rem"
            height="2rem"
          >
            끝
          </Button>
        )}
      </div>
    </PaginationBlock>
  );
}

export default Pagination;
