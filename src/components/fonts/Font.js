import React from 'react';

const Font = ({ children, fontFamily }) => {
  const style = {
    fontFamily: fontFamily || 'inherit',
  };

  return <div style={style}>{children}</div>;
};

export default Font;
