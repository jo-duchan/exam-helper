import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Button from "components/common/Button";
import ZIndex from "styles/z-index";
import { ModalProps } from "types/overlay";

const speed = 300;

function Modal({ title, content, left_button, right_button }: ModalProps) {
  return (
    <Container>
      <ModalBody>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ActionSection>
          {left_button && (
            <Button
              label={left_button.label || "닫기"}
              sort="gray"
              onClick={left_button.onClick}
            />
          )}
          <Button
            label={right_button.label || "확인"}
            onClick={right_button.onClick}
          />
        </ActionSection>
      </ModalBody>
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  ${ZIndex.MAX}
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

  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: 1;
    transition: opacity ${speed}ms ease-in-out;
  }

  &.exit {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
    transition: opacity ${speed}ms ease-in-out;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(var(--global-width) * 0.82051);
  height: 196px;
  padding: 33px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 16px;
  overflow: hidden;
  background: ${Color.Gray[100]};
  text-align: center;
  pointer-events: auto;
  ${ZIndex[100]};
`;

const Title = styled.h3`
  color: ${Color.Gray[800]};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  white-space: pre-line;
  color: ${Color.Gray[600]};
  ${Body.Medium.L};
  margin-bottom: 20px;
`;

const ActionSection = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
