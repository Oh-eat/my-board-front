import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { GoTag } from "react-icons/go";
import { useDispatch } from "react-redux";
import { changePost } from "../../modules/post_action";
import Tag from "../common/Tag";

const StyledTagInput = styled.input`
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  max-width: 10rem;
  margin-right: 1rem;
  border-bottom: 1px solid gray;

  &:focus {
    border-bottom-color: black;
  }
`;

const TagBoxBlock = styled.div`
  margin-top: 1rem;
  display: flex;

  .input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tags {
    margin-left: 2rem;
    flex-wrap: wrap;
  }
`;

function TagBox({ action, tags }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (input.trim() === "") {
        return;
      }

      if (tags.includes(input)) {
        setInput("");
        return;
      }

      const nextTags = [...tags, input];
      dispatch(changePost({ action, name: "tags", value: nextTags }));
      setInput("");
    },
    [input, dispatch, action, tags]
  );
  const onRemove = useCallback(
    (tag) => {
      const nextTags = tags.filter((t) => t !== tag);
      dispatch(changePost({ action, name: "tags", value: nextTags }));
    },
    [tags, dispatch, action]
  );

  return (
    <TagBoxBlock>
      <form className="input" onSubmit={onSubmit}>
        <StyledTagInput
          value={input}
          placeholder="태그"
          maxLength={10}
          onChange={onChange}
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
      <div className="tags">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} onClick={() => onRemove(tag)} />
        ))}
      </div>
    </TagBoxBlock>
  );
}

export default React.memo(TagBox);
