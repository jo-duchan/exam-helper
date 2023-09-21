import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Admin } from "types/admin-data";
import { nanoid } from "nanoid";

interface Props {
  data: {
    [key: string]: string;
  };
}

function Banner({ data }: Props) {
  const setting = {
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    // },
    speed: 450,
    // loop: true,
    spaceBetween: 10,
    // onSlideChange: (swiper: any) => setCurrent(swiper.realIndex),
    initialSlide: 1,
    modules: [Autoplay],
  };
  return (
    <Container {...setting} slidesPerView={"auto"}>
      {Object?.keys(data).map((key) => (
        <Item key={nanoid()}>
          <img src={data[key]} />
        </Item>
      ))}
      {/* {data} */}
    </Container>
  );
}

export default Banner;

const Container = styled(Swiper)`
  display: flex;
  width: 100%;
  height: 170px;
  margin-top: 20px;
  padding-inline: 25px;
  box-sizing: border-box;
`;

const Item = styled(SwiperSlide)`
  width: 87.17948vw;
  max-width: 340px;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 19px 0px rgba(0, 0, 0, 0.06);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
