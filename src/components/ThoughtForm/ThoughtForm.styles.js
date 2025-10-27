import styled from "styled-components";

export const FormWrap = styled.form`
  padding: 16px;
  background: var(--form-bg);   /* light gray */
  border: 1px solid var(--border, #e6dfe2);
  border-radius: var(--radius, 14px);
  box-shadow: var(--card-shadow, 6px 6px 0 #000);
  display: grid;
  gap: 12px;
`;

export const FormHeader = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;            /* 👈 ensures it’s visible */
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border, #e6dfe2);
  background: #fff;
  font: inherit;
  resize: vertical;

  &:focus { outline: 2px solid #ffd1dd; }
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
  color: var(--btn-text); 
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(180deg, #ff9eb8, #ff7fa3);
  box-shadow: 0 2px 0 rgba(0,0,0,.15);
  transition: transform .15s ease, opacity .15s ease;

  &:hover { transform: translateY(-1px); }
  &:disabled { opacity: .5; cursor: not-allowed; transform: none; }
`;

export const Counter = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: var(--muted, #666);
  &[data-too-long="true"] { color: #d92d20; font-weight: 700; }
`;
