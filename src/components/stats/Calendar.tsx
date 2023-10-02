import styled, { css } from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { format } from "date-fns";
import { ScoreList } from "types/user-data";

interface Props {
  scoreList: ScoreList;
}

interface StyledProps {
  active: boolean;
}

function Calendar({ scoreList }: Props) {
  const currentDate = new Date();
  const list = currentDate.getDate();

  const ActiveDate = (date: string) => {
    const validDate = Object.keys(scoreList).filter(
      (key: string) =>
        format(scoreList[key].date, "MM") === format(currentDate, "MM")
    );

    const active = validDate.filter(
      (key: string) => format(scoreList[key].date, "d") === date
    );

    return active.length > 0;
  };

  return (
    <Container>
      {[...Array(list)].map((item, index) => (
        <DateItem key={index} active={ActiveDate((index + 1).toString())}>
          <span>{index + 1}</span>
        </DateItem>
      ))}
    </Container>
  );
}

export default Calendar;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background: ${Color.Gray[200]};
  padding: 20px;
  box-sizing: border-box;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DateItem = styled.div<StyledProps>`
  position: relative;
  width: calc((100% - 8px * 6) / 7);
  height: 0;
  padding-bottom: calc((100% - 8px * 6) / 7);
  border-radius: 8px;
  overflow: hidden;

  & span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${Body.SemiBold.L};

    ${({ active }) =>
      active
        ? css`
            color: ${Color.Gray[100]};
            background: ${Color.Primary[700]};
          `
        : css`
            color: ${Color.Gray[500]};
            background: transparent;
          `}
  }
`;
