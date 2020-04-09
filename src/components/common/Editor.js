import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorBlock = styled.div`
  margin-top: ${(props) => props.marginTop || "1.5rem"};

  .ql-editor {
    padding: 1rem;
    min-height: ${(props) => props.height || "35vh"};
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
          [{ header: ["3", "4"] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
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
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = value;
  }, [value]);

  return (
    <EditorBlock height={height}>
      <div ref={quillElement} />
    </EditorBlock>
  );
}

export default Editor;
