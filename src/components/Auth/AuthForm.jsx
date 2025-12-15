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
  border: 2px solid var(--border-color);
  border-radius: 0;
  background: white;
  font-size: 16px;

  &:focus {
    outline: 2px solid var(--heart-bg-active);
  }
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

  &:hover {
    background: var(--heart-bg-empty);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: #c00;
  margin: 0;
`;

export default function AuthForm() {
  const { login, signup, authError, authLoading, isLoggedIn, user, logout } =
    useAuth();

  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    login(form);
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(form);
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
    <Wrapper>
      <h2 style={{ margin: 0 }}>Login or sign up</h2>

      <form>
        <Row>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
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
