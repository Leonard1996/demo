import React from "react";
import { Typography } from "antd";

const CopyRight = () => {
  const { Text, Link } = Typography;
  return (
    <Text type="secondary">
      Copyright &copy;2020 Produced by{" "}
      <Link href=" " target="_blank">
        Inovation
      </Link>
    </Text>
  );
};

export default CopyRight;
