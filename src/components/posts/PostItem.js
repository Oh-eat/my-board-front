import React from "react";
import styled from "styled-components";
import { TiDocumentText } from "react-icons/ti";
import { Link, withRouter } from "react-router-dom";
import Tag from "../common/Tag";
import formatDate from "../../lib/formatDate";

const PostItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  &:nth-child(even) {
    background: aliceblue;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const PostItemTop = styled.div`
  width: 100%;
  justify-content: space-between;

  .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    height: 100%;
    font-size: 0.9rem;

    a {
      margin-left: 0.25rem;

      &:visited {
        color: gray;
      }

      &:hover {
        color: dodgerblue;
      }
    }
  }

  .author {
    width: 7rem;
    justify-content: center;
    font-size: 0.9rem;
  }

  .date {
    width: 4rem;
    justify-content: center;
    font-size: 0.8rem;
  }
`;

const PostItemBottom = styled.div`
  margin-top: 0.25rem;
`;

function PostItem({ post, history }) {
  return (
    <PostItemBlock>
      <PostItemTop>
        <TiDocumentText size="1.1rem" />
        <div className="title">
          <Link to={`/post/read/${post._id}`}>{post.title}</Link>
        </div>
        <div className="author">{post.author.username}</div>
        <div className="date">{formatDate(post.publishedDate)}</div>
      </PostItemTop>
      {post.tags.length > 0 && (
        <PostItemBottom>
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} fontSize="0.7rem" />
          ))}
        </PostItemBottom>
      )}
    </PostItemBlock>
  );
}

export default withRouter(PostItem);
