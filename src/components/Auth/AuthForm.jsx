// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../hooks/useAuth";

// --- Shake animation when auth fails ---
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

  /* Shake when there's an error */
  ${({ $error }) => $error && `animation: ${shake} 0.35s ease;`}
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
  border: 2px solid
    ${({ $error }) => ($error ? "#c00" : "var(--border-color)")};
  background: ${({ $error }) => ($error ? "#ffe5e5" : "white")};
  border-radius: 0;
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

// A small green success message
const Success = styled.p`
  color: #0a7a0a;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export default function AuthForm() {
  const { login, signup, authError, authLoading, isLoggedIn, user, logout } =
    useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [justSignedIn, setJustSignedIn] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setJustSignedIn(false);
    await login(form);
    if (!authError) setJustSignedIn(true);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setJustSignedIn(false);
    await signup(form);
    if (!authError) setJustSignedIn(true);
  }

  if (isLoggedIn) {
    return (
      <Wrapper>
        <p>
          Logged in as <strong>{user?.username}</strong>
        </p>
        <Button type="button" onClick={logout}>Log out</Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper $error={!!authError}>
      <h2>Login or sign up</h2>

      {justSignedIn && (
        <Success>🎉 Welcome, {form.username}! You're now logged in.</Success>
      )}

      <form>
        <Row>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            $error={!!authError}
          />
        </Row>

        <Row>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            $error={!!authError}
          />
        </Row>

        {authError && <Error>{authError}</Error>}

        <ButtonRow>
          <Button type="submit" onClick={handleLogin} disabled={authLoading}>
            {authLoading ? "Logging in..." : "Log in"}
          </Button>

          <Button type="button" onClick={handleSignup} disabled={authLoading}>
            {authLoading ? "Signing up..." : "Sign up"}
          </Button>
        </ButtonRow>
      </form>
    </Wrapper>
  );
}
