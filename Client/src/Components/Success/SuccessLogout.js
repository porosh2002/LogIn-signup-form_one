import React from "react";
import { Link } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { Cross } from "../../Styled";
export default function LoginSuccess({ message0, message1,onClick}) {
  return (
    <div className="LogoutDIV">
      <Cross onClick={onClick}>
        <VscChromeClose />
      </Cross>
      <p>
        {message0}
        <span className="color-green">{message1}</span>

        <span>
          <Link className="loginModal" to="/login">
            {" "}
            Login{" "}
          </Link>
        </span>
        <span>
          <Link className="loginModal" to="/signup">
            {" "}
            Signup{" "}
          </Link>
        </span>
      </p>
    </div>
  );
}
