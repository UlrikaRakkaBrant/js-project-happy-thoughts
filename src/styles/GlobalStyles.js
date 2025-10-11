// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root{
    --card-bg: #ffffff;
    --card-shadow: 6px 6px 0 #000000;
    --form-bg: #f3e9ec;
    --text: #222;
    --muted: #666;
    --heart: #ff6b8b;
    --btn-grad-start:#ff9eb8;
    --btn-grad-end:#ff7fa3;
    --border:#e6dfe2;
    --radius: 14px;
    --gap: 16px;
    --maxw: 680px;
  }

  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: var(--text);
    background: #fffafc;
  }

  main {
    width: 100%;
    max-width: var(--maxw);
    margin: 32px auto 80px;
    padding: 0 16px;
    display: grid;
    gap: 24px;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--card-shadow);
  }
`;

export default GlobalStyles;
