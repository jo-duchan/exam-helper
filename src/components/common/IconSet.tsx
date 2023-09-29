import React from "react";
import { IconType } from "types/icon-set";
import { ReactComponent as Sucess } from "assets/icon/sucess.svg";
import { ReactComponent as Error } from "assets/icon/error.svg";
import { ReactComponent as Notify } from "assets/icon/notify.svg";
import { ReactComponent as Flag } from "assets/icon/flag.svg";

interface Props {
  type: IconType;
}

function IconSet({ type }: Props) {
  switch (type) {
    case "sucess":
      return <Sucess />;
    case "error":
      return <Error />;
    case "notify":
      return <Notify />;
    case "flag":
      return <Flag />;
    default:
      return <></>;
  }
}

export default IconSet;
