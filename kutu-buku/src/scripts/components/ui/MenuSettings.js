import React from 'react';

function MenuSettings({ icon, title, visible, navigation }) {
  return (
    <div id="menuItem">
      <i className={'menu-icon ' + icon}></i>
      <p>{title}</p>
    </div>
  );
}

export default MenuSettings;
