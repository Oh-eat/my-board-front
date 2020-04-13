import React from "react";
import styled from "styled-components";
import { TiDocumentText } from "react-icons/ti";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
import Tag from "../common/Tag";
import formatDate from "../../lib/formatDate";

const PostItemBlock = styled.li`
  width: 100%;
  display: grid;
  grid-template-areas:
    "icon title username date"
    "tags tags tags tags";
  grid-column-gap: 0.25rem;
  grid-template-columns: min-content 1fr 10rem 6rem;
  justify-items: center;
  align-items: center;
  padding: 0.5rem;
  list-style-image: none;

  .icon {
    grid-area: icon;
  }

  .title {
    grid-area: title;
    justify-self: flex-start;
    display: grid;
    grid-template-areas: "title commentCount";

    a {
      grid-area: title;
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        color: dodgerblue;
      }

      &:visited {
        color: gray;
      }
    }

    .comment {
      grid-area: commentCount;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;

      .icon {
      }

      .count {
        margin-left: 0.2rem;
      }
    }
  }

  .username {
    grid-area: username;
  }

  .date {
    grid-area: date;
  }

  .tags {
    margin-top: 0.25rem;
    grid-area: tags;
    justify-self: flex-start;
    width: 100%;
    white-space: nowrap;
    overflow-x: hidden;
  }

  &:nth-child(even) {
    background: aliceblue;
  }

  @media (max-width: 768px) {
    & {
      grid-template-areas:
        "icon title username"
        "tags tags date";
      grid-column-gap: 0.25rem;
      grid-template-columns: min-content 1fr auto;
      justify-items: flex-start;
      align-items: center;
      padding: 0.5rem;

      .date {
        justify-self: flex-end;
      }

      .username {
        justify-self: flex-end;
      }
    }
  }
`;

function PostItem({ post }) {
  return (
    <PostItemBlock>
      <TiDocumentText className="icon" size="1.1rem" />
      <div className="title">
        <Link to={`/post/read/${post._id}`}>{post.title}</Link>
        {post.commentCount > 0 && (
          <div className="comment">
            <div className="icon">
              <FaRegCommentDots size="0.9rem" />
            </div>
            <div className="count">{post.commentCount}</div>
          </div>
        )}
      </div>
      <div className="username">{post.author.username}</div>
      <div className="date">{formatDate(post.publishedDate)}</div>

      {post.tags.length > 0 && (
        <div className="tags">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} fontSize="0.7rem" />
          ))}
        </div>
      )}
    </PostItemBlock>
  );
}

export default withRouter(PostItem);
