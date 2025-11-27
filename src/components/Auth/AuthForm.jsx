// src/components/Auth/AuthForm.jsx
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const Wrapper = styled.section`
  padding: 16px;
  margin-bottom: 24px;
  border: 2px solid #000;
  background: #fdf5f7;
  display: grid;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #000;
  border-radius: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid #000;
  background: #ff9eb8;
  cursor: pointer;
`;

const Error = styled.p`
  color: #c00;
  margin: 0;
`;

export default function AuthForm() {
  const { login, signup, authError, authLoading, isLoggedIn, user, logout } = useAuth();
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
        <p>Logged in as <strong>{user?.username}</strong></p>
        <Button type="button" onClick={logout}>Log out</Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>Login or sign up</h2>
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
