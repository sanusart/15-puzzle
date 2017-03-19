import React from 'react';
import { Link } from 'react-router';

import './Button.css';

const Button = (props) => {
  if(props.to) {
    return (
      <Link to={props.to} className={props.className} onClick={props.onClick}>
        {props.text}
      </Link>
    );
  }
  return (
    <a className={props.className} onClick={props.onClick}>
      {props.text}
    </a>
  );
};

export default Button;
