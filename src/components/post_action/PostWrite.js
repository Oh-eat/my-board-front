import React from "react";
import styled from "styled-components";
import WriteActionButtonsContainer from "../../containers/post_action/WriteActionButtonsContainer";
import Editor from "../common/Editor";
import TagBox from "./TagBox";

const PostWriteBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitleInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0.5rem;
  font-size: 2.5rem;

  &:focus {
    border-bottom-color: black;
  }
`;

function PostWrite({ action, post, onChangeTitle, onChangeBody }) {
  return (
    <PostWriteBlock>
      <StyledTitleInput
        name="title"
        placeholder="제목"
        value={post.title}
        onChange={onChangeTitle}
        spellCheck={false}
      />
      <Editor value={post.body} onChange={onChangeBody} />
      <TagBox action={action} tags={post.tags} />
      <WriteActionButtonsContainer />
    </PostWriteBlock>
  );
}

export default PostWrite;
