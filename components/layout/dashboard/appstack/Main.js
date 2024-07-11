import React from 'react';
import classNames from 'classnames';

function Main({ className, children }) {
  return <div className={classNames('main', className)}>{children}</div>;
}

export default Main;
