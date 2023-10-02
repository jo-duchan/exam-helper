import React, { useRef } from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import useObserver from "hook/useObserver";
import Button from "components/common/Button";

interface Props {
  title: string;
  content: React.ReactNode;
  onClick: () => void;
}

interface StyledProps {
  position: "top" | "btm";
  active: boolean;
}

function Modal({ title, content, onClick }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const btmRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Title>{title}</Title>
      <ContentSection>
        <Content>
          <TextDim
            position="top"
            ref={topRef}
            active={useObserver({ dom: topRef })}
          />
          {content}
          <TextDim
            position="btm"
            ref={btmRef}
            active={useObserver({ dom: btmRef })}
          />
        </Content>
      </ContentSection>
      <Button label="확인" size="L" onClick={onClick} />
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 82.05128%;
  height: 526px;
  padding: 50px 20px 20px;
  box-sizing: border-box;
  border-radius: 16px;
  overflow: hidden;
  background: ${Color.Gray[100]};
  pointer-events: auto;
`;

const Title = styled.h3`
  width: 100%;
  color: ${Color.Gray[700]};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25em;
`;

const ContentSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  transform: translateZ(0);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden scroll;
  box-sizing: border-box;
`;

const TextDim = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: 10px;

  &::before {
    content: "";
    position: fixed;
    left: 0;
    top: ${({ position }) => (position === "top" ? "-10px" : "initial")};
    bottom: ${({ position }) => (position === "btm" ? "-10px" : "initial")};
    width: 100%;
    height: 74px;
    background: ${({ position }) =>
      `linear-gradient(${
        position === "top" ? 0 : "180deg"
      }, rgba(255, 255, 255, 0) 0%, #fff 100%);`};
    opacity: ${({ active }) => (active ? 0 : 1)};
    transition: opacity 300ms ease-in-out;
  }
`;
