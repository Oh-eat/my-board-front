import React from "react";
import styled from "styled-components";
import { TiDocumentText } from "react-icons/ti";
import { Link } from "react-router-dom";
import Tag from "../common/Tag";

const PostItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  &:nth-child(even) {
    background: #e8f4ff;
  }

  div {
    display: flex;
    align-items: center;
  }

  .top {
    width: 100%;
    justify-content: space-between;

    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 100%;
      font-size: 0.9rem;

      a {
        margin-left: 0.25rem;
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
  }

  .bottom {
  }
`;

function PostItem({ post }) {
  console.log(post);
  return (
    <PostItemBlock>
      <div className="top">
        <TiDocumentText size="1.1rem" />
        <div className="title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </div>
        <div className="author">{post.author.username}</div>
        <div className="date">
          {new Date(post.publishedDate).toLocaleDateString()}
        </div>
      </div>
      <div className="bottom">
        {post.tags.map((tag) => (
          <Tag key={tag} tag={tag} fontSize="0.7rem" />
        ))}
      </div>
    </PostItemBlock>
  );
}

export default PostItem;
