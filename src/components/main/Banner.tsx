import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Banner as BannerType } from "types/admin-data";
import { nanoid } from "nanoid";

interface Props {
  data: BannerType;
}

function Banner({ data }: Props) {
  const setting = {
    speed: 450,
    spaceBetween: 10,
  };

  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener, noreferrer");
  };

  return (
    <Container {...setting} slidesPerView={"auto"}>
      {Object?.keys(data).map((key) => (
        <Item key={nanoid()} onClick={() => handleClick(data[key].link)}>
          <img src={data[key].img} />
        </Item>
      ))}
    </Container>
  );
}

export default Banner;

const Container = styled(Swiper)`
  display: flex;
  width: 100%;
  height: 170px;
  @media screen and (min-width: 500px) {
    height: 204px;
  }
  margin-top: 20px;
  padding-inline: 25px;
  box-sizing: border-box;
`;

const Item = styled(SwiperSlide)`
  width: calc(var(--gobal-width) - 50px);
  height: 120px;
  @media screen and (min-width: 500px) {
    height: 154px;
  }
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 19px 0px rgba(0, 0, 0, 0.06);

  /* IOS Webkit 버그 대응 */
  transform: translateZ(0);
  will-change: transform;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    user-select: none;
  }
`;
