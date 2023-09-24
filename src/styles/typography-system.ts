import { css } from "styled-components";

const Heading = {
  H1: css`
    font-size: 32px;
    font-weight: 700;
    line-height: 1.25em;
  `,
  H2: css`
    font-size: 26px;
    font-weight: 700;
    line-height: 1.25em;
  `,
};

const Body = {
  Bold: {
    XL: css`
      font-size: 18px;
      font-weight: 700;
      line-height: 1.25em;
    `,
    L: css`
      font-size: 16px;
      font-weight: 700;
      line-height: 1.25em;
    `,
    M: css`
      font-size: 14px;
      font-weight: 700;
      line-height: 1.25em;
    `,
  },
  SemiBold: {
    L: css`
      font-size: 16px;
      font-weight: 600;
      line-height: 1.25em;
    `,
    M: css`
      font-size: 14px;
      font-weight: 600;
      line-height: 1.25em;
    `,
    S: css`
      font-size: 12px;
      font-weight: 600;
      line-height: 1.25em;
    `,
    XS: css`
      font-size: 10px;
      font-weight: 600;
      line-height: 1.25em;
    `,
  },
  Medium: {
    L: css`
      font-size: 16px;
      font-weight: 500;
      line-height: 1.25em;
    `,
    M: css`
      font-size: 14px;
      font-weight: 500;
      line-height: 1.25em;
    `,
    S: css`
      font-size: 12px;
      font-weight: 500;
      line-height: 1.25em;
    `,
  },
};

export { Heading, Body };
