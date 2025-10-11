import { useState } from "react";
import {
  FormWrap,
  FormHeader,
  TextArea,
  Row,
  Counter,
  SubmitBtn,
} from "./ThoughtForm.styles";

export default function ThoughtForm({ onSubmit }) {
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
      <FormHeader>What’s making you happy right now?</FormHeader>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="React is making me happy!"
        maxLength={maxLen + 20} // allow a bit more typing but we validate
        aria-invalid={tooShort || tooLong}
      />
      <Row>
        <SubmitBtn type="submit" disabled={tooShort || tooLong}>
          ❤️ Send Happy Thought ❤️
        </SubmitBtn>
        <Counter data-too-long={tooLong}>
          {remaining >= 0 ? `${remaining}` : `-${Math.abs(remaining)}`} / {maxLen}
        </Counter>
      </Row>
    </FormWrap>
  );
}
