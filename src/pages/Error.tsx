import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Navigation from "components/common/Navigation";
import Button from "components/common/Button";
import Assets from "assets/img/error.png";

function ErrorPage() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  useEffect(() => {
    // hideProgress();
  }, []);

  let title = "오류 페이지";
  let message = "페이지를 찾을 수 없어요.";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "404 오류";
    message = "페이지를 찾을 수 없어요.";
  }

  return (
    <Container>
      <Navigation label="오류" />
      <ContentSection>
        <Visual>
          <img className="error-img" src={Assets} alt="에러 이미지" />
        </Visual>
        <Title>{title}</Title>
        <Description>{message}</Description>
        <Button
          label="홈으로 돌아가기"
          size="L"
          onClick={() => navigate("/", { replace: true })}
        />
      </ContentSection>
    </Container>
  );
}

export default ErrorPage;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 25px;
  box-sizing: border-box;
`;
const Visual = styled.div`
  position: relative;
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  margin-top: 40px;
  margin-right: 7.647%;
  margin-bottom: 36px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  ${Heading.H2};
  margin-bottom: 6px;
`;

const Description = styled.span`
  text-align: center;
  color: ${Color.Gray[600]};
  ${Body.SemiBold.L};
  margin-bottom: 50px;
`;
