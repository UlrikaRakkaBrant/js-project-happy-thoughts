// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root{
    --card-bg: #ffffff;
    --card-shadow: 6px 6px 0 #000000;
    --form-bg: #f3f3f398;           /* light gray for ThoughtForm */
    --text: #222;
    --muted: #666;
    --heart: #ff6b8b;
    --heart-bg-empty: var(--form-bg);
    --heart-bg-active: #ff9eb8;   /* same pink as button */
    --btn-text: #000;             /* black text on the Send button */
    --btn-grad-start:#ff9eb8;
    --btn-grad-end:#ff7fa3;
    --border:#e6dfe2;
    --radius: 0px;
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
    box-shadow: var(--card-shadow);
  }
`;

export default GlobalStyles;
