import { useNavigate, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import { Onboarding } from "types/admin-data";
import service from "utils/service";
import Button from "components/common/Button";

interface StyledProps {
  length: number;
}

function OnboardingPage() {
  const data = useLoaderData() as Onboarding;
  const navigate = useNavigate();

  const GoToMain = () => {
    localStorage.setItem("onboarding", "hide");
    navigate("/");
  };

  const GoToDocument = () => {
    const link =
      "https://www.notion.so/exam-helper/Exam-Helper-d437612b838042a89e0bea1a7c22e066";
    window.open(link, "_blank", "noopener, noreferrer");
  };

  return (
    <Container>
      <SwiperSection
        speed={450}
        pagination
        modules={[Pagination]}
        length={Object.keys(data).length - 1}
      >
        {Object.keys(data).map((key) => (
          <Item key={key}>
            <img className="item-img" src={data[key].img} />
            <span className="item-title">
              {data[key].title.replace(/(\\n)/g, "\n")}
            </span>
          </Item>
        ))}
      </SwiperSection>
      <ButtonSection>
        <Button label="시작하기" size="L" onClick={GoToMain} />
        <MoreView onClick={GoToDocument}>자세한 설명 확인해 볼까요?</MoreView>
      </ButtonSection>
    </Container>
  );
}

export default OnboardingPage;

export async function loader() {
  const onboarding = await service.GET("admin/onboarding");

  return onboarding;
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100dvh;
`;

const SwiperSection = styled(Swiper)<StyledProps>`
  width: 100%;
  height: 67.51879%;
  overflow: initial;
  overflow-x: clip;

  & .swiper-pagination {
    position: absolute;
    width: ${({ length }) => `calc(22px + (18px * ${length}))`};
    left: 50%;
    bottom: -32px;
    padding-block: 4px;
    box-sizing: border-box;
    transform: translate3d(-50%, 0, 0);
    display: flex;
    gap: 10px;
  }
  & .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: ${Color.Gray[400]};
    border-radius: 4px;
    transition: width 600ms ease-in-out, background 400ms ease-in-out;
  }

  & .swiper-pagination-bullet-active {
    width: 22px;
    background: ${Color.Gray[800]};
  }
`;

const Item = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .item-img {
    width: 100%;
    object-fit: cover;
  }

  & .item-title {
    width: 100%;
    text-align: center;
    white-space: pre-line;
    color: ${Color.Gray[800]};
    ${Heading.H2};
  }

  @media screen and (min-width: 500px) {
    gap: 20px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  width: 100%;
  height: 32.4812%;
  padding-inline: 25px;
  box-sizing: border-box;
`;

const MoreView = styled.div`
  color: ${Color.Gray[600]};
  ${Body.SemiBold.L}
  text-decoration-line: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
  user-select: none;
`;
