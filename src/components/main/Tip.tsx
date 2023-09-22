import styled from "styled-components";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Record from "assets/img/record.png";
import Button from "components/common/Button";

function Tip() {
  const portalElement = document.getElementById("overlays");
  const navigate = useNavigate();

  const renderContent = () => {
    return (
      <Container>
        <img src={Record} alt="성장기록 아이콘" />
        <div className="text-content">
          <span className="title">성장기록</span>
          <span className="desciption">나의 성장을 한눈에 확인해 보세요!</span>
        </div>
        <Button
          label="확인하기"
          size="S"
          width="83px"
          onClick={() => navigate("/stats")}
        />
      </Container>
    );
  };

  return ReactDOM.createPortal(renderContent(), portalElement as HTMLElement);
}

export default Tip;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${Color.Gray[100]};
  border-radius: 16px 16px 0 0;
  padding: 20px 25px 22px 25px;
  box-sizing: border-box;
  box-shadow: 0px -8px 16px 0px rgba(0, 0, 0, 0.06);
  pointer-events: auto;

  & img {
    width: 40px;
    height: 40px;
  }

  & .text-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  & .text-content .title {
    color: ${Color.Gray[700]};
    ${Body.Bold.XL};
  }

  & .text-content .desciption {
    color: ${Color.Gray[500]};
    ${Body.SemiBold.M};
  }

  /* & button {
    margin-left: auto;
    padding: 10px 18px 10px 18px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #2c6ff6;
    border: initial;
    outline: initial;

    color: ${Color.Gray[100]};
    ${Body.Medium.M};
  } */
`;
