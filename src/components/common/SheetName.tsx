import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Input from "components/common/Input";
import Chip from "components/common/Chip";
import Button from "components/common/Button";

interface Props {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  valid: boolean;
}

function SheetName({ list, setList, valid }: Props) {
  const [sheetName, setSheetName] = useState<string>("");

  const handleAddSheetNameList = () => {
    if (sheetName) {
      setList((prev) => {
        return [...prev, sheetName];
      });
      setSheetName("");
    }
  };

  const HandleRemoveSheetNameList = (index: number) => {
    setList((prev) => {
      const newList = prev.filter((item, idx) => idx !== index);
      return newList;
    });
  };

  return (
    <Container>
      <div className="input-wrapper">
        <Input
          label="구글 시트 이름"
          width="calc(100% - 136px)"
          placeholder="시트 이름을 입력해 주세요."
          status={!valid ? "error" : "default"}
          errorMsg="하나 이상 추가해 주세요."
          value={sheetName}
          onChange={(e) => setSheetName(e.currentTarget.value)}
        />
        <div className="button-wrapper">
          <Button
            label="완료"
            size="M"
            width="128px"
            onClick={handleAddSheetNameList}
          />
        </div>
      </div>
      <div className="chip-wrapper">
        {list.map((sheetName, index) => (
          <Chip
            key={nanoid(6)}
            label={sheetName}
            onRemove={() => HandleRemoveSheetNameList(index)}
          />
        ))}
      </div>
    </Container>
  );
}

export default SheetName;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & .input-wrapper {
    display: flex;
    gap: 8px;
  }

  & .button-wrapper {
    margin-top: 26px;
  }

  & .chip-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
`;
