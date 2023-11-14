import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Color from "styles/color-system";

const fontFamily =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

const GlobalStyle = createGlobalStyle`
${reset};

:root {
    --global-width: clamp(320px, 100vw, 500px);
    -webkit-tap-highlight-color: transparent;
}

html, body {
    width: 100%;
    height: 100%;
    background: ${Color.Gray[300]};
}

#root {
    font-family: ${fontFamily};
    display: flex;
    width: var(--global-width);
    min-height: 100%;
    background: ${Color.Gray[100]};
    margin-inline: auto;
}

textarea {
    font-family: ${fontFamily};
}

#overlays {
    pointer-events: none;
}

button {
    background: initial;
    border: initial;
    padding: initial;
}
`;

export { GlobalStyle };
