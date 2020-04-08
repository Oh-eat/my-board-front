import React from "react";
import styled from "styled-components";
import Editor from "../common/Editor";

const WriteEditorBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

function WriteEditor({ post, onChangeTitle, onChangeBody }) {
  return (
    <WriteEditorBlock>
      <StyledTitleInput
        name="title"
        placeholder="제목"
        value={post.title}
        onChange={onChangeTitle}
        spellCheck={false}
        maxLength={50}
      />
      <Editor value={post.body} onChange={onChangeBody} />
    </WriteEditorBlock>
  );
}

export default WriteEditor;
