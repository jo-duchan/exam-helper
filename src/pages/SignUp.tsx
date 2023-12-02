import ReactDOM from "react-dom";
import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
  To,
  useLocation,
} from "react-router-dom";
import { auth } from "firebase-config";
import { updateProfile } from "firebase/auth";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import emailjs from "@emailjs/browser";
import service from "utils/service";
import { showToast } from "utils/overlays";
import { Play } from "types/user-data";
import Navigation from "components/common/Navigation";
import Input from "components/common/Input";
import SheetName from "components/common/SheetName";
import CheckBox from "components/common/CheckBox";
import Button from "components/common/Button";
import PrivacyModal from "components/overlays/PrivacyModal";
import Privacy from "components/auth/Privacy";

interface StyledProps {
  gap: number;
  paddingTop: number;
  paddingBtm: number;
}

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [serchParams] = useSearchParams();
  const showPrivacy = serchParams.get("modal") || "";
  const [name, setName] = useState<string>("");
  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [playList, setPlayList] = useState<Play[]>([]);
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [sheetUrlValid, setSheetUrlValid] = useState<boolean>(true);
  const [playListValid, setPlayListValid] = useState<boolean>(true);

  const privacyAgree = () => {
    const portalElement = document.getElementById("overlays") as HTMLElement;

    return ReactDOM.createPortal(
      <PrivacyModal
        title="개인정보 처리방침"
        content={<Privacy />}
        onClick={() => {
          setPrivacy(true);
          navigate(-1 as To, { replace: true });
        }}
      />,
      portalElement
    );
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    const totalStage = 10;
    const vibration = true;

    setNameValid(true);
    setSheetUrlValid(true);
    setPlayListValid(true);

    if (name.trim() === "") {
      setNameValid(false);
      return;
    }

    if (sheetUrl.trim() === "") {
      setSheetUrlValid(false);
      return;
    }

    if (!playList.length) {
      setPlayListValid(false);
      return;
    }

    if (!privacy) {
      showToast("개인정보 처리방침에 동의해 주세요.", "error");
      return;
    }

    if (!user) {
      navigate("/signin");
      showToast("다시 시도해 주세요.", "error");
      return;
    }

    await updateProfile(user, {
      displayName: name,
    });

    await service.SET(`users/${user.uid}`, {
      playList,
      sheetUrl,
      totalStage,
      vibration,
    });

    // const emailParams = {
    //   to_name: name,
    //   to_email: email,
    //   from_name: "Exam Helper",
    //   to_userKey: userKey,
    // };

    // await emailjs
    //   .send(
    //     process.env.REACT_APP_SERVICE_ID as string,
    //     process.env.REACT_APP_TEMPLATE_ID as string,
    //     emailParams,
    //     process.env.REACT_APP_PUBLIC_KEY as string
    //   )

    showToast("가입이 축하해요. \n이그잼 헬퍼와 함께 성장해요.", "sucess");
    // Protected Route에서 온거면 리다이렉트로 보내주기.
    navigate(from, { replace: true });
  };
  return (
    <Container>
      {showPrivacy && privacyAgree()}
      <Navigation label="회원가입" left="disabled" />
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
            label="구글 시트 URL"
            placeholder="URL을 입력해 주세요."
            status={!sheetUrlValid ? "error" : "default"}
            errorMsg="구글 시트 URL을 확인해 주세요."
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.currentTarget.value)}
          />
          <SheetName
            list={playList}
            setList={setPlayList}
            valid={playListValid}
          />
        </InnerSection>
        <InnerSection paddingTop={30} paddingBtm={40} gap={20}>
          <CheckBox
            contact={false}
            value={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
          >
            <PrivacyLabel
              className="label"
              onClick={() => navigate("?modal=privacy")}
            >
              개인정보처리방침 동의(필수)
            </PrivacyLabel>
          </CheckBox>
          <Button label="가입하기" size="L" onClick={handleSubmit} />
        </InnerSection>
      </ContentSection>
    </Container>
  );
}

export default SignUpPage;

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

const PrivacyLabel = styled.span`
  color: ${Color.Gray[700]};
  ${Body.Medium.M};
  text-decoration-line: underline;
  text-underline-offset: 0.22em;
`;
