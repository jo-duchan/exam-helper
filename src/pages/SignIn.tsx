import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "utils/service";
import { showToast } from "utils/overlays";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Input from "components/common/Input";
import Button from "components/common/Button";
import Assets from "assets/img/sign-in.png";

function SignInPage() {
  const navigate = useNavigate();
  const [userKey, setUserKey] = useState<string>("");
  const [userKeyValid, setUserKeyValid] = useState<boolean>(true);

  useEffect(() => {
    const theme = document.getElementById("theme") as HTMLMetaElement;
    theme.setAttribute("content", Color.Primary[700]);

    return () => {
      theme.setAttribute("content", Color.Gray[100]);
    };
  }, []);

  const handleSubmit = async () => {
    if (userKey.trim() === "") {
      setUserKeyValid(false);
      return;
    }

    const data = await service.GET(`users/${userKey}/name`);

    if (data) {
      showToast(`${data}님 반가워요.\n이그잼 헬퍼와 함께 성장해요!`, "sucess");
      localStorage.setItem("userKey", userKey!);
      navigate("/");
    } else {
      setUserKeyValid(false);
    }
  };

  return (
    <Container>
      <VisualSection>
        <img src={Assets} />
        <h3>{"내일의 결과를\n만드는 시작"}</h3>
        <span className="dot-01" />
        <span className="dot-02" />
        <span className="dot-03" />
        <span className="dot-04" />
      </VisualSection>
      <ContentSection>
        <Input
          label="사용자 키"
          placeholder="사용자 키를 입력해 주세요."
          status={!userKeyValid ? "error" : "default"}
          errorMsg="사용자 키를 다시 확인해주세요."
          value={userKey}
          onChange={(e) => setUserKey(e.currentTarget.value)}
        />
        <Button label="로그인" onClick={handleSubmit} />
        <SignUpLink to="/signup">처음 방문하셨나요?</SignUpLink>
      </ContentSection>
    </Container>
  );
}

export default SignInPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  height: 100dvh;
  background-image: ${`linear-gradient(${Color.Primary[700]}, ${Color.Primary[700]})`};
`;

const VisualSection = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 242px);
  padding-block: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  overflow: hidden;

  & img {
    padding-inline: 48px;
    box-sizing: border-box;
    height: calc(100% - (80px + 20px));
    object-fit: contain;
  }

  & h3 {
    height: 80px;
    text-align: center;
    color: ${Color.Gray[100]};
    ${Heading.H1};
    white-space: pre;
  }

  & :is(.dot-01, .dot-02, .dot-03, .dot-04) {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  & .dot-01 {
    top: 12.5641%;
    left: 14.61538%;
    width: 4.102564%;
    padding-bottom: 4.102564%;
    background: #568cf8;
  }

  & .dot-02 {
    top: 40%;
    right: 15.1282%;
    width: 6.410256%;
    padding-bottom: 6.410256%;
    background: #417df7;
  }

  & .dot-03 {
    top: 74.10256%;
    left: 14.3589%;
    width: 7.43589%;
    padding-bottom: 7.43589%;
    background: #417df7;
  }

  & .dot-04 {
    top: 81.53846%;
    right: 15.1282%;
    width: 5.3846%;
    padding-bottom: 5.3846%;
    background: #80a9fa;
  }
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 242px;
  border-radius: 16px 16px 0 0;
  padding-inline: 25px;
  box-sizing: border-box;
  background: ${Color.Gray[100]};
  box-shadow: 0px -8px 16px 0px rgba(0, 0, 0, 0.06);
`;

const SignUpLink = styled(Link)`
  margin-top: 6px;
  color: ${Color.Gray[700]};
  ${Body.Medium.L};
  text-underline-offset: 0.2em;
`;
