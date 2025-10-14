import styled from "styled-components";

export const Card = styled.article`
  padding: 18px;
  display: grid;
  gap: 14px;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  word-break: break-word;
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 10px;
`;

export const HeartBtn = styled.button`
  width: 36px; height: 36px; padding: 0;
  border-radius: 50%; border: 1px solid var(--border);
  background: #fff; display: grid; place-items: center;
  cursor: pointer; transition: transform .1s ease, opacity .1s ease;
  &:hover { transform: scale(1.06); }
  &:disabled { opacity: .5; cursor: not-allowed; transform: none; }
`;


export const Count = styled.span`
  color: var(--muted);
  font-weight: 600;
`;

export const Time = styled.time`
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
`;
