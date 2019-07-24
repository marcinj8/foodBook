import React from 'react';
import NavigationItem from './NavigationItem';

import './NavigationBlock.css';

const navigationBlock = props => {
  const navigationElements = [];

  for (let item in props.navigation) {
    navigationElements.push (
      <NavigationItem
        key={item}
        value={item}
        disabled={props.navigation[item].disabled}
        active={props.navigation[item].active}
        name={props.navigation[item].name}
        clicked={props.setActiveOverlap}
      />
    );
  }

  return (
    <div className="navigation__contianer">
      {navigationElements}
    </div>
  );
};

export default navigationBlock;
