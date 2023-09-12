import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function BackNavigation() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <BackButton onClick={handleBack} type="button">
        뒤로가기
      </BackButton>
    </Container>
  );
}

export default BackNavigation;

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const BackButton = styled.button`
  border: initial;
  background: initial;
`;
