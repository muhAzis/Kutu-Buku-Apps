import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuItems({ icon, title, navigation, active, logout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!navigation) {
      return '';
    }

    if (logout) {
      return logout();
    }

    navigate(navigation);
  };

  return (
    <div id="menuItem" className={active ? 'active' : ''} onClick={() => handleClick()}>
      <i className={'menu-icon ' + icon}></i>
      <p>{title}</p>
    </div>
  );
}

export default MenuItems;
