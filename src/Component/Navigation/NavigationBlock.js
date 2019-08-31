import React from 'react';

import icon from '../../Assets/recipeIcon.png';

import NavigationItem from './NavigationItem';
import SideBarItem from '../SideBar/SideBar';
import Backdrop from '../Modal/Backdrop';

import './NavigationBlock.css';

const navigationBlock = props => {
  const navigationElements = [];
  const sideBarElements = [];
  const sidebarStyle = [
    'navigation__sidebar',
    props.showSidebar
      ? 'navigation__sidebar--open'
      : 'navigation__sidebar--close'
  ]

  for (let item in props.navigation) {
    navigationElements.push(
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

  for (let item in props.navigation) {
    sideBarElements.push(
      <SideBarItem
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
    <nav className="navigation__contianer">
      <div className='navigatoin__desktop'>
        {navigationElements}
      </div>
      <div className='navigation__togglerSidebar'>
        <button
          className='navigation__sidebarTogglerButton'
          onClick={props.sidebarToggler}>
          <div></div>
          <div></div>
          <div></div>
        </button>

      </div>
      <Backdrop
        clicked={props.sidebarToggler}
        show={props.showSidebar} />
      <div className={sidebarStyle.join(' ')}>
        <img className="navigation__sidebarLogo" src={icon} alt="" />
        {sideBarElements}
        <button className='navigation__sidebarButton'
          onClick={props.sidebarToggler}>Close</button>
      </div>
    </nav >
  );
};

export default navigationBlock;
