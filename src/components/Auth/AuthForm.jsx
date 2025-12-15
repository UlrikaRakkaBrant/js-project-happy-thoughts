// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const Wrapper = styled.section`
  max-width: 500px;
  margin: 0 auto 32px auto;
  padding: 20px;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  display: grid;
  gap: 16px;
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
  border: 2px solid ${({ $error }) =>
    $error ? "#c00" : "var(--border-color)"};
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
  margin: 0;
  font-weight: 600;
`;

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
    } catch {
      // error handled in context
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSuccessMsg("");
    try {
      await signup(form);
      setSuccessMsg(`🎉 Welcome, ${form.username}!`);
    } catch {
      // error handled in context
    }
  }

  function handleLogout() {
    logout();
    setSuccessMsg("");
  }

  if (isLoggedIn) {
    return (
      <Wrapper>
        <p>
          Logged in as <strong>{user.username}</strong>
        </p>
        <Button type="button" onClick={handleLogout}>
          Log out
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>Login or sign up</h2>

      {successMsg && <Success>{successMsg}</Success>}
      {authError && <Error>{authError}</Error>}

      <form>
        <Row>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
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
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            $error={!!authError}
          />
        </Row>

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
