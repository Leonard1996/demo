import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'

const Title = ({ name, fs, fw, capital, level, maxWidth, lh }) => {
  const { Text } = Typography
  return (
    <Text
      level={level}
      style={{
        maxWidth: `${maxWidth}`,
        fontSize: `${fs}`,
        textTransform: `${capital}` === true ? 'uppercase' : '',
        fontWeight: `${fw}` ? `${fw}` : 'normal',
        lineHeight: lh,
      }}
    >
      {name}
    </Text>
  )
}

Title.propTypes = {
  name: PropTypes.any,
  fs: PropTypes.any,
  fw: PropTypes.any,
  capital: PropTypes.any,
  level: PropTypes.any,
  maxWidth: PropTypes.any,
  lh: PropTypes.any,
}

export default Title
