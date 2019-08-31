import React from 'react';

import './NavigationItem.css';

const navigationItem = props => {
  const navigationItemStyle = [
    'navigation__item',
    props.active
      ? 'navigation__item--active'
      : props.disabled
          ? 'navigation__item--disabled'
          : 'navigation__item--noActive',
  ];

  let onClickFunction = () => {
    return false;
  };

  if (!props.disabled) {
    onClickFunction = () => {
      return props.clicked (props.value);
    };
  }

  return (
    <div className={navigationItemStyle.join (' ')} onClick={onClickFunction}>
      {props.name}
    </div>
  );
};

export default navigationItem;
