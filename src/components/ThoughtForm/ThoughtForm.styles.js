import styled from "styled-components";

export const FormWrap = styled.form`
  padding: 16px;
  background: var(--form-bg);              /* light gray background */
  border: 2px solid var(--border-color);   /* thicker border */
  border-radius: var(--radius);            /* sharp corners */
  box-shadow: var(--card-shadow);
  display: grid;
  gap: 12px;
`;

export const FormHeader = styled.h2`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 0;                       /* 👈 sharp corners */
  font: inherit;
  resize: vertical;
  background: #fff;
  &:focus {
    outline: 2px solid #ffd1dd;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SubmitBtn = styled.button`
  padding: 10px 18px;
  border: 0;
  border-radius: 999px;
  color: var(--btn-text);                 /* black text */
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(
    180deg,
    var(--btn-grad-start),
    var(--btn-grad-end)
  );
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Counter = styled.span`
  font-size: 12px;
  color: var(--muted);
  &[data-too-long="true"] {
    color: #d92d20;
    font-weight: 700;
  }
`;
