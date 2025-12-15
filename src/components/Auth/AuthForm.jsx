// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const Wrapper = styled.section`
  padding: 16px;
  margin: 0 auto 32px;
  background: var(--form-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  display: grid;
  gap: 12px;
`;

const Header = styled.h2`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
`;

const Row = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid
    ${({ $error }) => ($error ? "#c00" : "var(--border-color)")};
  border-radius: 0;
  font: inherit;
  background: ${({ $error }) => ($error ? "#ffe5e5" : "#fff")};

  &:focus {
    outline: 2px solid #ffd1dd;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 18px;
  border: 0;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  color: var(--btn-text);
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

const Error = styled.p`
  color: #c00;
  margin: 0;
  font-weight: 700;
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
        <Header>Account</Header>
        <p>
          Logged in as <strong>{user.username}</strong>
        </p>
        <Button type="button" onClick={logout}>
          Log out
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>Login or sign up</Header>

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
