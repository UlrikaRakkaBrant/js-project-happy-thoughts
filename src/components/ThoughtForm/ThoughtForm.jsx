import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  background: #fff;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-family: inherit;
  font-size: 16px;
  resize: none;
`;

const SubmitButton = styled.button`
  background: #ffadad;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);

  &:disabled {
    background: #f0c4c4;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const HeartEmoji = styled.span`
  margin: 0 8px;
`;

const Counter = styled.div`
  text-align: right;
  font-size: 12px;
  margin-top: 4px;
  color: ${(props) => (props.overLimit ? '#e63946' : '#666')};
`;

function ThoughtForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const maxChars = 140;
  const remaining = maxChars - message.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length < 5 || message.length > maxChars) return;

    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        onSubmit(newThought);
        setMessage('');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="happy-input">What's making you happy right now?</Label>
      <TextArea
        id="happy-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your happy thought here..."
      />
      <Counter overLimit={remaining < 0}>{remaining} characters remaining</Counter>
      <SubmitButton type="submit" disabled={message.trim().length < 5 || remaining < 0}>
        <HeartEmoji>❤️</HeartEmoji>
        Send Happy Thought
        <HeartEmoji>❤️</HeartEmoji>
      </SubmitButton>
    </Form>
  );
}

ThoughtForm.propTypes = { onSubmit: PropTypes.func.isRequired };
export default ThoughtForm;
