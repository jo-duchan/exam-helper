import styled from "styled-components";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Utils from "utils/utils";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import Button from "components/common/Button";

interface Props {
  data: {
    img: string;
    title: string;
    description: string;
    link: string;
  };
}

function Information({ data }: Props) {
  const portalElement = document.getElementById("overlays");
  const navigate = useNavigate();

  const renderContent = () => {
    const handleClick = () => {
      if (data.title === "튜토리얼") {
        const key = Utils.convertSheetUrl(data.link);
        navigate(`/quiz/${data.title}?mode=${key}`);
        return;
      }
      navigate(data.link);
    };
    return (
      <Container>
        <img src={data.img} alt={`${data.title} 아이콘`} />
        <div className="text-content">
          <span className="title">{data.title}</span>
          <span className="description">{data.description}</span>
        </div>
        <Button label="확인하기" size="S" width="83px" onClick={handleClick} />
      </Container>
    );
  };

  return ReactDOM.createPortal(renderContent(), portalElement as HTMLElement);
}

export default Information;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
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
    margin-left: 4.41176%;
    margin-right: auto;
  }

  & .text-content .title {
    color: ${Color.Gray[700]};
    ${Body.Bold.XL};
  }

  & .text-content .description {
    color: ${Color.Gray[500]};
    ${Body.SemiBold.M};
  }
`;
