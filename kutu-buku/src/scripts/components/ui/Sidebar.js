import '../../../styles/Sidebar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kblogo from '../../../img/kb_logo.png';
import MenuItems from './MenuItems';
import axios from 'axios';

function Sidebar({ page }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  const menuItems = [
    ['uil uil-plus', 'Add Book', '/add-book'],
    ['uil uil-book-open', 'Dashboard', '/'],
    ['uil uil-user', 'Profile', '/profile'],
    ['uil uil-setting', 'Settings', '/settings'],
    ['uil uil-info-circle', 'About', '/about'],
    ['uil uil-signout', 'Logout', '/login'],
  ]; //[icon, title, navigation]

  const logout = async () => {
    try {
      const response = await axios.delete('/logout', { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="sidebar" className={active}>
      <div className="menu-bar">
        <img src={kblogo} alt="Kutu Buku" />
      </div>
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input type="text" placeholder="Search book..." />
      </div>
      <div className="menu-items">
        {menuItems.map((items) => {
          return <MenuItems key={items[1]} icon={items[0]} title={items[1]} navigation={items[2]} active={items[1] === page ? true : false} logout={items[1] === 'Logout' ? logout : ''} />;
        })}
      </div>
      <div className="menu-settings"></div>
    </div>
  );
}

export default Sidebar;
