import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Color from "styles/color-system";
import ZIndex from "styles/z-index";

const GlobalStyle = createGlobalStyle`
${reset};

:root {
    --gobal-width: clamp(320px, 100vw, 500px);
}

html, body {
    width: 100%;
    height: 100%;
    background: ${Color.Gray[300]};
}

#root {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    display: flex;
    width: var(--gobal-width);
    height: 100%;
    background: ${Color.Gray[100]};
    margin-inline: auto;
}

#overlays {
    position: fixed;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: var(--gobal-width);
    height: 100%;
    pointer-events: none;
    ${ZIndex["MAX"]};
}
`;

export { GlobalStyle };
