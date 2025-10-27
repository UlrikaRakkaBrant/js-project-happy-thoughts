import { useState } from "react";
import {
  FormWrap,
  FormHeader,
  TextArea,
  Row,
  Counter,
  SubmitBtn,
} from "./ThoughtForm.styles";

export default function ThoughtForm({ onSubmit, submitting = false }) {
  const [text, setText] = useState("");
  const maxLen = 140;
  const tooShort = text.trim().length < 5;
  const tooLong = text.length > maxLen;

  function handleSubmit(e) {
    e.preventDefault();
    if (tooShort || tooLong) return;
    onSubmit?.(text.trim());
    setText("");
  }

  return (
    <FormWrap className="card" onSubmit={handleSubmit}>
      <FormHeader>What’s making you happy right now?</FormHeader>

      {/* 👇 This must be present AND have onChange */}
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="React is making me happy!"
        aria-invalid={tooShort || tooLong}
      />

      <Row>
        <SubmitBtn type="submit" disabled={submitting || tooShort || tooLong}>
          {submitting ? "Sending..." : "❤️ Send Happy Thought ❤️"}
        </SubmitBtn>
        <Counter data-too-long={tooLong}>
          {Math.max(0, maxLen - text.length)} / {maxLen}
        </Counter>
      </Row>
    </FormWrap>
  );
}
