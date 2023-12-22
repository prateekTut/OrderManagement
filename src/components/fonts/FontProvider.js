import React from 'react';

const FontContext = React.createContext();

const FontProvider = ({ fonts, children }) => {
  return <FontContext.Provider value={fonts}>{children}</FontContext.Provider>;
};

export { FontProvider, FontContext };
