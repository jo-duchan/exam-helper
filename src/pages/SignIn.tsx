import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import service from "utils/service";
import { showToast } from "utils/overlays";
import styled from "styled-components";
import Color from "styles/color-system";
import { Heading, Body } from "styles/typography-system";
import Assets from "assets/img/sign-in.png";
import { ReactComponent as Google } from "assets/icon/google.svg";

function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname + location.state?.from?.search || "/";

  useEffect(() => {
    const theme = document.getElementById("theme") as HTMLMetaElement;
    theme.setAttribute("content", Color.Primary[700]);

    return () => {
      theme.setAttribute("content", Color.Gray[100]);
    };
  }, []);

  const handleSign = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const isNewUser = getAdditionalUserInfo(result)!.isNewUser;

      if (isNewUser) {
        navigate("/signup");
        return;
      }
      await service
        .GET(`users/${result.user.uid}`)
        .then(() => {
          showToast(
            `${result.user.displayName}님 반가워요.\n이그잼 헬퍼와 함께 성장해요!`,
            "sucess"
          );
          navigate(from, { replace: true });
        })
        .catch(() => {
          showToast(`회원가입을 완료해 주세요.`, "notify");
          navigate("/signup");
        });
    } catch (error) {
      console.error(error);
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
      <ButtonSection>
        <Description>
          구글 계정으로 로그인하고 이그잼 헬퍼를 시작해 봐요.
        </Description>
        <SignInButton onClick={handleSign}>
          <Google />
          <span>구글 계정으로 로그인</span>
        </SignInButton>
      </ButtonSection>
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
  height: calc(100% - 142px);
  padding-block: 40px 65px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 55px;
  overflow: hidden;

  & img {
    padding-inline: 48px;
    box-sizing: border-box;
    height: calc(100% - (80px + 55px));
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
    top: 34%;
    right: 15.1282%;
    width: 6.410256%;
    padding-bottom: 6.410256%;
    background: #417df7;
  }

  & .dot-03 {
    top: 58.10256%;
    left: 14.3589%;
    width: 7.43589%;
    padding-bottom: 7.43589%;
    background: #417df7;
  }

  & .dot-04 {
    top: 64.53846%;
    right: 15.1282%;
    width: 5.3846%;
    padding-bottom: 5.3846%;
    background: #80a9fa;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 142px;
  padding-inline: 25px;
  box-sizing: border-box;
  text-align: center;
`;

const Description = styled.p`
  color: ${Color.Gray[100]};
  ${Body.Medium.M};
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  height: 56px;
  background: ${Color.Gray[100]};
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  & span {
    color: ${Color.Gray[600]};
    ${Body.Medium.L};
  }
`;
