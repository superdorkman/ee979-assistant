import React from "react";
import { Container } from "./MyDialog.styled";

function MyDialog(props) {
  const { children, title, extra } = props;

  return (
    <Container>
      <h2>
        <span className="title">{title}</span>
        <span className="qufu">{extra}</span>
      </h2>
      {children}
    </Container>
  );
}

export default MyDialog;