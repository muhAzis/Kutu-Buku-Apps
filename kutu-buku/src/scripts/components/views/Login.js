/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import '../../../styles/Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('ref_token')) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = '/login';
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          credentials: 'include',
        }
      );

      if (response.status === 201) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;

        setHidden(true);
        navigate('/');
      } else {
        setLoading(false);
        setHidden(false);
        setErrorMsg(response.message);
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    const borderEmail = (e) => {
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)) {
        return (e.target.className = 'isTrue');
      }

      return (e.target.className = '');
    };

    const borderPass = (e) => {
      if (e.target.value === '') {
        return (e.target.className = '');
      }

      return (e.target.className = 'isTrue');
    };

    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        borderEmail(e);
        break;
      case 'password':
        setPassword(e.target.value);
        borderPass(e);
        break;
      default:
        break;
    }
  };

  const loginErrorMsg = () => {
    return (
      <p id="loginError" className="warnError" hidden={hidden}>
        {errorMsg}
      </p>
    );
  };

  const loadingBar = () => {
    if (loading) {
      return <div className="loading-bar"></div>;
    }
  };

  return (
    <div id="loginContainer">
      <div id="loginCard">
        <h1 id="loginHeading">Login</h1>
        <form id="loginForm" action="get" onSubmit={handleLogin}>
          <input type="email" id="email" placeholder="Email" value={email} onChange={handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
          <input type="password" id="password" placeholder="Password" value={password} onChange={handleChange} required />
          {loadingBar()}
          {loginErrorMsg()}
          <button type="submit" id="loginBtn">
            Login
          </button>
        </form>
        <p id="signInLink">
          Don't have account yet? <Link to="/signin">Sign in</Link> here!
        </p>
      </div>
    </div>
  );
};

export default Login;
