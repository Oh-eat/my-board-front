import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { GoTag } from "react-icons/go";
import Tag from "../common/Tag";

const StyledTagInput = styled.input`
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  max-width: 10rem;
  margin-right: 1rem;
  border-bottom: 1px solid gray;

  &:disabled {
    background: white;
  }

  &:focus {
    border-bottom-color: black;
  }

  @media (max-width: 480px) {
    max-width: initial;
    flex: 1;
  }
`;

const TagBoxBlock = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: flex-start;

  .input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tags {
    margin-left: 2rem;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    .tags {
      margin-left: 0;
      margin-top: 0.5rem;
    }
  }
`;

function TagBox({ input, tags, onChange, onSubmit, onRemove }) {
  return (
    <TagBoxBlock>
      <form className="input" onSubmit={onSubmit}>
        <StyledTagInput
          value={input}
          placeholder={tags.length < 7 ? "태그" : "태그 한도 초과"}
          maxLength={10}
          onChange={onChange}
          disabled={tags.length >= 7}
        />
        <Button
          type="submit"
          width="2rem"
          height="2rem"
          disabled={tags.length >= 7}
        >
          <GoTag size="1.25rem" />
        </Button>
      </form>
      {tags.length > 0 && (
        <div className="tags">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} onClick={() => onRemove(tag)} />
          ))}
        </div>
      )}
    </TagBoxBlock>
  );
}

export default React.memo(TagBox);
