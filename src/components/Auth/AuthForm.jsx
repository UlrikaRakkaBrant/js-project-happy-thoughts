// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useAuth } from "../../hooks/useAuth";

// --- Shake animation ---
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 0 auto 32px auto;
  padding: 20px;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  display: grid;
  gap: 16px;

  ${({ $error }) =>
    $error &&
    css`
      animation: ${shake} 0.35s ease;
    `}
`;

const Row = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid ${({ $error }) => ($error ? "#c00" : "var(--border-color)")};
  background: ${({ $error }) => ($error ? "#ffe5e5" : "white")};
  font-size: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  background: var(--heart-bg-active);
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #c00;
  margin: 0;
  font-weight: 600;
`;

const Success = styled.p`
  color: #0a7a0a;
  font-weight: 600;
  margin: 0;
`;

export default function AuthForm() {
  const { login, signup, authError, authLoading, isLoggedIn, user, logout } =
    useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMsg("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setSuccessMsg("");
    try {
      await login(form);
      setSuccessMsg(`🎉 Welcome back, ${form.username}!`);
    } catch { }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSuccessMsg("");
    try {
      await signup(form);
      setSuccessMsg(`🎉 Welcome, ${form.username}!`);
    } catch { }
  }

  if (isLoggedIn) {
    return (
      <Wrapper>
        <p>
          Logged in as <strong>{user?.username}</strong>
        </p>
        <Button type="button" onClick={logout}>
          Log out
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper $error={!!authError}>
      <h2>Login or sign up</h2>

      {successMsg && <Success>{successMsg}</Success>}
      {authError && <Error>{authError}</Error>}

      <form>
        <Row>
          <Label>Username</Label>
          <Input
            name="username"
            value={form.username}
            onChange={handleChange}
            $error={!!authError}
          />
        </Row>

        <Row>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            $error={!!authError}
          />
        </Row>

        <ButtonRow>
          <Button onClick={handleLogin} disabled={authLoading}>
            Log in
          </Button>
          <Button onClick={handleSignup} disabled={authLoading}>
            Sign up
          </Button>
        </ButtonRow>
      </form>
    </Wrapper>
  );
}
