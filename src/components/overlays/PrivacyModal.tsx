import React, { useRef } from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import ZIndex from "styles/z-index";
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

function PrivacyModal({ title, content, onClick }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const btmRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Modal>
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
      </Modal>
    </Container>
  );
}

export default PrivacyModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  ${ZIndex.MAX};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: calc(var(--global-width) * 0.82051);
  height: 526px;
  padding: 50px 20px 20px;
  box-sizing: border-box;
  border-radius: 16px;
  overflow: hidden;
  background: ${Color.Gray[100]};
  pointer-events: auto;
  ${ZIndex[100]}
`;

const Title = styled.h3`
  width: 100%;
  color: ${Color.Gray[800]};
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
