import React from 'react';

import icon from '../../Assets/recipeIcon.png';

import './Logo.css';

const logo = () => (
  <div className="logo__container">
    <h1 className="logo__header">
      <span className="logo__firstLetter">R</span>
      ecipes
      {' '}
      <span className="logo__firstLetter">B</span>
      ook
    </h1>
    <img className="logo__icon" src={icon} alt="" />
  </div>
);

export default logo;
