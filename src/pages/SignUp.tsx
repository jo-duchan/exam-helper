import { useEffect, useState } from "react";
import {
  useNavigate,
  redirect,
  json,
  useSearchParams,
  To,
} from "react-router-dom";
import styled from "styled-components";
import Color from "styles/color-system";
import { Body } from "styles/typography-system";
import { nanoid } from "nanoid";
import emailjs from "@emailjs/browser";
// import useOverlay from "hook/useOverlay";
import service from "hook/useService";
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
  const [hideId, setHideId] = useState<string>("");
  const [serchParams] = useSearchParams();
  const showPrivacyModal = serchParams.get("modal") || "";
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [playList, setPlayList] = useState<Play[]>([]);
  const [privacy, setPrivacy] = useState<boolean>(false);

  const [nameValid, setNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [sheetUrlValid, setSheetUrlValid] = useState<boolean>(true);
  const [playListValid, setPlayListValid] = useState<boolean>(true);

  useEffect(() => {
    if (showPrivacyModal) {
      privacyAgree();
    }

    if (!showPrivacyModal) {
      // handleHide(hideId);
    }
  }, [showPrivacyModal]);

  const privacyAgree = () => {
    // const id = handleShow(
    //   <PrivacyModal
    //     title="개인정보 처리방침"
    //     content={<Privacy />}
    //     onClick={() => {
    //       setPrivacy(true);
    //       navigate(-1 as To, { replace: true });
    //     }}
    //   />,
    //   "POPUP"
    // );
    // setHideId(id);
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

    if (!playList.length) {
      setPlayListValid(false);
      return;
    } else {
      setPlayListValid(true);
    }

    if (!privacy) {
      // showToast("개인정보 처리방침에 동의해 주세요.", "error");
      return;
    }

    const emailParams = {
      to_name: name,
      to_email: email,
      from_name: "Exam Helper",
      to_userKey: userKey,
    };

    // showProgress();
    await service().SET(`users/${userKey}`, {
      userKey,
      name,
      email,
      created,
      sheetUrl,
      playList,
    });
    localStorage.setItem("userKey", userKey);
    await emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID as string,
        process.env.REACT_APP_TEMPLATE_ID as string,
        emailParams,
        process.env.REACT_APP_PUBLIC_KEY as string
      )
      .catch(() => {
        json({ message: "사용자 키를 발송하지 못했어요." }, { status: 500 });
      });
    // hideProgress();

    // showToast(
    //   "가입이 축하드려요. \n사용자 키는 이메일로 보내드렸어요.",
    //   "sucess"
    // );
    navigate("/");
  };
  return (
    <Container>
      <Navigation label="회원가입" mode={-1} />
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

const PrivacyLabel = styled.span`
  color: ${Color.Gray[700]};
  ${Body.Medium.M};
  text-decoration-line: underline;
  text-underline-offset: 0.22em;
`;
