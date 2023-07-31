/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!document.cookie.includes('ref_token')) {
      navigate('/login');
    }

    (async () => {
      try {
        const response = await axios.get('/profile');
        console.log('status: ', response.status, ', message: ', response.data.message);

        if (response.data.message === 'Logout success') {
          navigate('/login');
        }

        setUserName(response.data.payload.name);
        setEmail(response.data.payload.email);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogout = async () => {
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
    <>
      <h1>This is Profile</h1>
      <div>Welcome, {userName}!</div>
      <p>{email}</p>
      <button onClick={() => navigate('/')}>Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
