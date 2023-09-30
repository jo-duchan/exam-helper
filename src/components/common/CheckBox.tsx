import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Color from "styles/color-system";
import { nanoid } from "nanoid";
import Checked from "assets/icon/check.svg";

interface Props {
  children?: React.ReactNode;
  contact?: boolean;
  value?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckBox({
  children,
  contact = true,
  value = false,
  onChange,
}: Props) {
  const [contactID, setContactID] = useState("");

  useEffect(() => {
    if (contact) {
      setContactID(nanoid(10));
    } else {
      setContactID("");
    }
  }, [contact]);
  return (
    <Container>
      <CheckboxElm
        type="checkbox"
        id={contactID}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={contactID}>{children}</label>
    </Container>
  );
}

export default CheckBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  &,
  & label {
    cursor: pointer;
    user-select: none;
  }
`;

const CheckboxElm = styled.input`
  all: unset;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${Color.Gray[200]};
  transition: background 150ms ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${`url(${Checked})`};
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
  }

  &:checked {
    background: ${Color.Primary[700]};
  }

  &:checked::after {
    opacity: 1;
  }
`;
