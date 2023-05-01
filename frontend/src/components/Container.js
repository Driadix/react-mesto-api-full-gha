import React from 'react';

const Container = ({ children, name }) => {
  return <div className={`container ${name}`}>{children}</div>;
};

export default Container;
