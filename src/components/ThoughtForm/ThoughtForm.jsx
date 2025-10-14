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
  const remaining = maxLen - text.length;
  const tooShort = text.trim().length < 5;
  const tooLong = text.length > maxLen;

  function handleSubmit(e) {
    e.preventDefault();
    if (tooShort || tooLong) return;
    onSubmit?.(text.trim());
    setText("");
  }

  return (
    <FormWrap className="card" onSubmit={handleSubmit} aria-label="Happy Thought form">
      {/* ... */}
      <Row>
        <SubmitBtn type="submit" disabled={submitting || tooShort || tooLong}>
          {submitting ? "Sending..." : "❤️ Send Happy Thought ❤️"}
        </SubmitBtn>
        <Counter data-too-long={tooLong}>
          {remaining >= 0 ? `${remaining}` : `-${Math.abs(remaining)}`} / {maxLen}
        </Counter>
      </Row>
    </FormWrap>
  );
}