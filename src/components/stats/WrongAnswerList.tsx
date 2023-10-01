import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { Score } from "types/user-data";
import Button from "components/common/Button";

interface Props {
  title: string;
  data: Score[];
}

function WrongAnswerList({ title, data }: Props) {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>{title}</Title>
      <ListSection>
        {data.map((item) => (
          <ItemSection key={item.date}>
            <span className="score">{item.score}점</span>
            <span className="sheetname">{item.sheetName}</span>
            <Button
              label="오답 리스트"
              size="S"
              width="98px"
              onClick={() => navigate(`/wrongAnswerList/${item.key}`)}
            />
          </ItemSection>
        ))}
      </ListSection>
    </Container>
  );
}

export default WrongAnswerList;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.span`
  color: ${Color.Gray[600]};
  ${Body.SemiBold.M};
`;

const ListSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6.47058%;
  padding: 21px 20px;
  box-sizing: border-box;
  border-radius: 16px;
  overflow: hidden;
  background: ${Color.Gray[200]};
  text-align: left;
  ${Body.Bold.L};

  & .score {
    width: 43px;
    color: ${Color.Gray[700]};
  }

  & .sheetname {
    flex: 1;
    color: ${Color.Gray[500]};
  }
`;
