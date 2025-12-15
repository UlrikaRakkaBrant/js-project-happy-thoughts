// src/components/ThoughtCard/ThoughtCard.styles.js
import styled from "styled-components";

export const Card = styled.article`
  padding: 18px;
  display: grid;
  gap: 14px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  box-shadow: var(--card-shadow);
`;

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  word-break: break-word;
`;

export const Author = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 10px;
`;

export const HeartBtn = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) =>
    $active ? "var(--heart-bg-active)" : "var(--heart-bg-empty)"};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.1s ease, background-color 0.1s ease;

  &:hover {
    transform: scale(1.06);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
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

// --- Edit / delete actions ---

export const Actions = styled.div`
  display: inline-flex;
  gap: 6px;
`;

export const ActionButton = styled.button`
  padding: 4px 8px;
  border-radius: 0;
  border: 1px solid var(--border-color);
  background: #ffe3ec;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #ffcadc;
  }
`;

export const EditInput = styled.input`
  width: 100%;
  margin-top: 8px;
  padding: 6px 8px;
  border: 1px solid var(--border-color);
  border-radius: 0;
  font-size: 14px;
`;
