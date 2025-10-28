// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* 🎨 Color system */
    --card-bg: #ffffff;           /* Thought cards background */
    --form-bg: #e2dddd;           /* ThoughtForm background (slightly darker gray) */
    --border-color: #d5d5d5;      /* Neutral gray border */
    --text: #222;                 /* Primary text color */
    --muted: #666;                /* Secondary text color */
    --heart: #ff6b8b;             /* Heart emoji color */
    --heart-bg-empty: var(--form-bg);
    --heart-bg-active: #ff9eb8;   /* Pink when liked */
    --btn-text: #000;             /* Black text on Send button */
    --btn-grad-start: #ff9eb8;
    --btn-grad-end: #ff7fa3;
    --background: #fffafc;        /* Page background */

    /* 🧱 Layout + sizing */
    --radius: 0px;                /* Sharp corners globally */
    --gap: 16px;
    --maxw: 680px;

    /* 🩶 Shadows + outlines */
    --card-shadow: 6px 6px 0 #000000;
  }

  /* Global resets and base styles */
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: var(--text);
    background: var(--background);
  }

  main {
    width: 100%;
    max-width: var(--maxw);
    margin: 32px auto 80px;
    padding: 0 16px;
    display: grid;
    gap: 24px;
  }

  /* 🧩 Base card style */
  .card {
    border: 1px solid var(--border-color);
    box-shadow: var(--card-shadow);
  }

  /* 🎯 Override specifically for ThoughtForm */
  form.card {
    background: var(--form-bg);
  }
`;

export default GlobalStyles;
