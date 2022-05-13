import React from "react";
import { Typography } from "antd";

const Title = ({ name, fs, fw, capital, level, maxWidth, lh }) => {
  const { Text } = Typography;
  return (
    <Text
      level={level}
      style={{
        maxWidth: `${maxWidth}`,
        fontSize: `${fs}`,
        textTransform: `${capital}` === true ? "uppercase" : "",
        fontWeight: `${fw}` ? `${fw}` : "normal",
        lineHeight: lh,
      }}
    >
      {name}
    </Text>
  );
};

export default Title;
