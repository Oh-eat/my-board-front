import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorBlock = styled.div`
  margin-top: ${(props) => props.marginTop || "2rem"};

  .ql-editor {
    padding: 1rem;
    min-height: ${(props) => props.height || "30rem"};
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .ql-editor.ql-blank::before {
    left: 1rem;
    font-style: normal;
  }
`;

function Editor({ value, onChange, height }) {
  const quillInstance = useRef(null);
  const quillElement = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.root.setAttribute("spellcheck", false);
    quill.on("text-change", (delata, oldDelta, source) => {
      if (source === "user") {
        onChange(quill.root.innerHTML);
      }
    });
  }, [onChange]);

  const mounted = useRef(null);
  useEffect(() => {
    if (mounted) return;
    mounted.current = true;
    quillInstance.root.innerHTML = value;
  }, [value]);

  return (
    <EditorBlock height={height}>
      <div ref={quillElement} />
    </EditorBlock>
  );
}

export default Editor;