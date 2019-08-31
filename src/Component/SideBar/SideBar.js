import React from 'react';

import './SideBar.css';

const sideBarItem = props => {

    const sideBarItemStyle = [
        'sideBarItem__item',
        props.active
          ? 'sideBarItem__item--active'
          : props.disabled
              ? 'sideBarItem__item--disabled'
              : 'sideBarItem__item--noActive',
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
        <div className={sideBarItemStyle.join(' ')} onClick={onClickFunction}>
            {props.name}
        </div>
    )
}

export default sideBarItem;