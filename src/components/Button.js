import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ to, className, onClick, text }) => {
  if (to) {
    return (
      <Link to={ to } className={ className } onClick={ onClick }>
        {text}
      </Link>
    );
  }

  return (
    <div className={ className } onClick={ onClick } role="button">
      {text}
    </div>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string
};

export default Button;
