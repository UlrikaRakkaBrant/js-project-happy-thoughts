// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useAuth } from "../../hooks/useAuth";

/* ---------------- Animations ---------------- */

const shakeFrames = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
`;

const shake = css`
  animation: ${shakeFrames} 0.35s ease;
`;

/* ---------------- Styles ---------------- */

const Wrapper = styled.section`
  max-width: 520px;
  margin: 0 auto 32px auto;
  padding: 18px;
  display: grid;
  gap: 16px;

  background: var(--card-bg);
  border: 2px solid var(--border-color);
  box-shadow: var(--card-shadow);

  ${({ $shake }) => $shake && shake}
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
  font-size: 16px;
  background: white;
  border-radius: 0;

  border: 2px solid
    ${({ $error }) => ($error ? "#c00" : "var(--border-color)")};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;

  border: 2px solid var(--border-color);
  background: var(--heart-bg-active);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #c00;
  font-weight: 600;
  margin: 0;
`;

const Success = styled.p`
  color: #0a7a0a;
  font-weight: 600;
  margin: 0;
`;

/* ---------------- Component ---------------- */

export default function AuthForm() {
  const {
    login,
    signup,
    authError,
    authLoading,
    isLoggedIn,
    user,
    logout,
  } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [justSignedIn, setJustSignedIn] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  // Detect backend “username exists” error
  const usernameExists =
    authError?.toLowerCase().includes("already exists");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setJustSignedIn(false);
    setShakeForm(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setShakeForm(false);
    await login(form);
    if (!authError) setJustSignedIn(true);
    else setShakeForm(true);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setShakeForm(false);
    await signup(form);
    if (!authError) setJustSignedIn(true);
    else setShakeForm(true);
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
    <Wrapper $shake={shakeForm}>
      <h2>Login or sign up</h2>

      {justSignedIn && (
        <Success>🎉 Welcome, {form.username}!</Success>
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
          <Button
            type="submit"
            onClick={handleLogin}
            disabled={authLoading}
          >
            {authLoading ? "Logging in..." : "Log in"}
          </Button>

          <Button
            type="button"
            onClick={handleSignup}
            disabled={authLoading || usernameExists}
            title={
              usernameExists
                ? "That username already exists"
                : ""
            }
          >
            {authLoading ? "Signing up..." : "Sign up"}
          </Button>
        </ButtonRow>
      </form>
    </Wrapper>
  );
}
