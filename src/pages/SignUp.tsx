import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { nanoid } from "nanoid";
import useOverlay from "hook/useOverlay";
import service from "hook/useService";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import Chip from "components/common/Chip";
import CheckBox from "components/common/CheckBox";
import Button from "components/common/Button";

interface StyledProps {
  gap: number;
  paddingTop: number;
  paddingBtm: number;
}

function SignUpPage() {
  const navigate = useNavigate();
  const { showProgress, hideProgress, showToast } = useOverlay();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [sheetNameList, setSheetNameList] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<boolean>(false);

  const [nameValid, setNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [sheetUrlValid, setSheetUrlValid] = useState<boolean>(true);
  const [sheetNameListValid, setSheetNameListValid] = useState<boolean>(true);

  const handleAddSheetNameList = () => {
    if (sheetName) {
      setSheetNameList((prev) => {
        return [...prev, sheetName];
      });
      setSheetName("");
    }
  };

  const HandleRemoveSheetNameList = (index: number) => {
    setSheetNameList((prev) => {
      const newList = prev.filter((item, idx) => idx !== index);
      return newList;
    });
  };

  const handleSubmit = async () => {
    const userKey = nanoid();
    const created = Date.now();
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (name.trim() === "") {
      setNameValid(false);
      return;
    } else {
      setNameValid(true);
    }

    if (!regex.test(email)) {
      setEmailValid(false);
      return;
    } else {
      setEmailValid(true);
    }

    if (sheetUrl.trim() === "") {
      setSheetUrlValid(false);
      return;
    } else {
      setSheetUrlValid(true);
    }

    if (sheetNameList.length <= 0) {
      setSheetNameListValid(false);
      return;
    } else {
      setSheetNameListValid(true);
    }

    if (!privacy) {
      showToast("개인정보 처리방침에 동의해 주세요.", "error");
      return;
    }

    showProgress();
    await service().SET(`users/${userKey}`, {
      userKey,
      name,
      email,
      created,
      sheetUrl,
      sheetNameList,
    });
    localStorage.setItem("userKey", userKey);
    // 이메일로 유저키 발송
    hideProgress();

    showToast("등록이 완료되었어요.", "sucess");
    navigate("/");
  };
  return (
    <Container>
      <Navigation label="회원가입" />
      <ContentSection>
        <InnerSection paddingTop={40} paddingBtm={30} gap={16}>
          <Input
            label="이름"
            placeholder="이름을 입력해 주세요."
            status={!nameValid ? "error" : "default"}
            errorMsg="이름을 입력해 주세요."
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Input
            label="이메일"
            placeholder="이메일을 입력해 주세요."
            status={!emailValid ? "error" : "default"}
            errorMsg="이메일을 확인해 주세요."
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            label="구글 시트 URL"
            placeholder="URL을 입력해 주세요."
            status={!sheetUrlValid ? "error" : "default"}
            errorMsg="구글 시트 URL을 확인해 주세요."
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.currentTarget.value)}
          />
          <SheetNameSectioin>
            <div className="input-wrapper">
              <Input
                label="구글 시트 이름"
                width="calc(100% - 136px)"
                placeholder="시트 이름을 입력해 주세요."
                status={!sheetNameListValid ? "error" : "default"}
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
              {sheetNameList.map((sheetName, index) => (
                <Chip
                  key={nanoid(6)}
                  label={sheetName}
                  onRemove={() => HandleRemoveSheetNameList(index)}
                />
              ))}
            </div>
          </SheetNameSectioin>
        </InnerSection>
        <InnerSection paddingTop={30} paddingBtm={40} gap={20}>
          <CheckBox
            contact={false}
            value={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
          >
            <PrivacyLabel className="label">
              개인정보 처리방침 동의(필수)
            </PrivacyLabel>
          </CheckBox>
          <Button label="등록하기" size="L" onClick={handleSubmit} />
        </InnerSection>
      </ContentSection>
    </Container>
  );
}

export default SignUpPage;

export async function loader() {
  const data = localStorage.getItem("userKey");
  if (data) {
    return redirect("/");
  }
  return null;
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${Color.Gray[200]};
`;

const InnerSection = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap}px`};
  padding-inline: 25px;
  padding-top: ${({ paddingTop }) => `${paddingTop}px`};
  padding-bottom: ${({ paddingBtm }) => `${paddingBtm}px`};
  box-sizing: border-box;
  background: ${Color.Gray[100]};
`;

const SheetNameSectioin = styled.div`
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

const PrivacyLabel = styled.span`
  color: ${Color.Gray[700]};
  ${Body.Medium.M};
  text-decoration-line: underline;
  text-underline-offset: 0.22em;
`;
