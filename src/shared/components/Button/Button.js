import React from "react";
import { Button as AntButton } from "antd";

const Button = ({ name, type, size, danger, ghost }) => {
  return (
    <AntButton type={type} size={size} danger={danger} ghost={ghost}>
      {name}
    </AntButton>
  );
};

export default Button;
