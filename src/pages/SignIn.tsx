import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "hook/useService";
import useOverlay from "hook/useOverlay";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Input from "components/common/Input";
import Button from "components/common/Button";
import Assets from "assets/img/sign-in.png";

function SignInPage() {
  const navigate = useNavigate();
  const { showToast, showProgress, hideProgress } = useOverlay();
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
    showProgress();
    const data = await service().GET(`users/${userKey}/name`);
    hideProgress();

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
        <h3>{"내일의 결과를\n만드는 시작."}</h3>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: ${Color.Primary[700]};
`;

const VisualSection = styled.div`
  position: relative;
  flex: 1;

  & img {
    width: 100%;
    object-fit: contain;
  }

  & h3 {
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translate3d(-50%, 0, 0);
    text-align: center;
    color: ${Color.Gray[100]};
    ${Heading.H1};
    white-space: pre;
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
