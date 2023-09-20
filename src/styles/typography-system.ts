import { css } from "styled-components";

const Heading = css`
  font-size: 26px;
  font-weight: 700;
  line-height: 34px;
`;

const Body = {
  Bold: {
    XL: css`
      font-size: 18px;
      font-weight: 700;
      line-height: normal;
    `,
    L: css`
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
    `,
    M: css`
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
    `,
  },
  SemiBold: {
    L: css`
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    `,
    M: css`
      font-size: 14px;
      font-weight: 600;
      line-height: normal;
    `,
    S: css`
      font-size: 12px;
      font-weight: 600;
      line-height: normal;
    `,
    XS: css`
      font-size: 10px;
      font-weight: 600;
      line-height: normal;
    `,
  },
  Medium: {
    L: css`
      font-size: 16px;
      font-weight: 500;
      line-height: normal;
    `,
    M: css`
      font-size: 14px;
      font-weight: 500;
      line-height: normal;
    `,
    S: css`
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
    `,
  },
};

export { Heading, Body };
