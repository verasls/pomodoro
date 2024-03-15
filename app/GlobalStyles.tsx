"use client";

import { createGlobalStyle, css } from "styled-components";

const styles = css`
  :root {
    &,
    &.light-mode {
      --bg-color: #fff;
      --text-color: #343a40;
      --primary-color: #f1f3f5;
      --accent-color: #fa5252;
      --white: #f8f9fa;
      --backdrop-color: rgba(248, 249, 250, 0.1);
      --shadow-small: 5px 10px 30px 0px rgba(0, 0, 0, 0.15);
      --shadow-large: 10px 20px 30px 0px rgba(0, 0, 0, 0.15);
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  body {
    font-family: "Rubik", sans-serif;
    color: var(--text-color);
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  button,
  input,
  label {
    line-height: 1.1;
  }

  h1,
  h2,
  h3,
  h4 {
    text-wrap: balance;
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      -moz-text-size-adjust: none;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
      margin-block-end: 0;
    }

    ul[role="list"],
    ol[role="list"] {
      list-style: none;
    }

    body {
      min-height: 100vh;
      line-height: 1.5;
    }

    h1,
    h2,
    h3,
    h4,
    button,
    input,
    label {
      line-height: 1.1;
    }

    h1,
    h2,
    h3,
    h4 {
      text-wrap: balance;
    }

    a:not([class]) {
      text-decoration-skip-ink: auto;
      color: currentColor;
    }

    img,
    picture {
      max-width: 100%;
      display: block;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    textarea:not([rows]) {
      min-height: 10em;
    }

    :target {
      scroll-margin-block: 5ex;
    }
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
    color: currentColor;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  textarea:not([rows]) {
    min-height: 10em;
  }

  :target {
    scroll-margin-block: 5ex;
  }

  button {
    border: none;
    background: transparent;
    color: inherit;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${styles}
`;

export default GlobalStyles;
