import React, { useState, useCallback } from "react";
import TagBox from "../../components/post_action/TagBox";
import { useDispatch, useSelector } from "react-redux";
import { changePost } from "../../modules/post_action";

function TagBoxContainer(props) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const postAction = useSelector(({ postAction }) => postAction);
  const action = postAction.postId ? "edit" : "write";
  const { tags } = postAction[action];

  const onChange = useCallback((e) => {
    if (RegExp(/\s/g).test(e.target.value)) return;
    setInput(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const tag = String(input).replace(/\s/g, "");

      if (tag === "") {
        return;
      }

      if (tags.includes(tag)) {
        setInput("");
        return;
      }

      const nextTags = [...tags, tag];
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
    <TagBox
      input={input}
      tags={tags}
      onChange={onChange}
      onSubmit={onSubmit}
      onRemove={onRemove}
    />
  );
}

export default TagBoxContainer;
