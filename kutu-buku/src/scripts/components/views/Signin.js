import '../../../styles/Signin.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [hiddenName, setHiddenName] = useState(true);
  const [hiddenEmail, setHiddenEmail] = useState(true);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);

  const handleChange = (e) => {
    const addNameClass = (e) => {
      if (/(?=.*[^A-Za-z ])/.test(e.target.value) || e.target.value === '') {
        return (e.target.className = '');
      }
      return (e.target.className = 'isTrue');
    };

    const addEmailClass = (e) => {
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)) {
        return (e.target.className = 'isTrue');
      }
      return (e.target.className = '');
    };

    const addPassClass = (e) => {
      if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(e.target.value)) {
        return (e.target.className = 'isTrue');
      }
      return (e.target.className = '');
    };

    const reTypePassClass = (e) => {
      if (e.target.value === password && e.target.value !== '') {
        e.target.className = 'isTrue';
        e.target.setCustomValidity('');
      } else {
        e.target.className = '';
        e.target.setCustomValidity(`Password don't match`);
      }
    };

    switch (e.target.id) {
      case 'firstName':
        setFName(e.target.value);
        setHiddenName(false);
        addNameClass(e);
        break;
      case 'lastName':
        setLName(e.target.value);
        setHiddenName(false);
        addNameClass(e);
        break;
      case 'email':
        setEmail(e.target.value);
        setHiddenEmail(false);
        addEmailClass(e);
        break;
      case 'password':
        setPassword(e.target.value);
        setHiddenPass(false);
        addPassClass(e);
        break;
      case 'confirmPassword':
        setRePass(e.target.value);
        setHiddenRePass(false);
        reTypePassClass(e);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: `${fName} ${lName}`,
      email: email,
      password: password,
    };

    const submitData = async () => {
      try {
        const response = await axios.post('/register', formData);

        console.log(response.data);
        setError(true);
      } catch (error) {
        console.log(error.response.data);
        setErrorMsg(error.response.data.message);
        setError(false);
      }
    };
    submitData();
  };

  const handleLeave = () => {
    setHiddenName(true);
    setHiddenEmail(true);
    setHiddenPass(true);
    setHiddenRePass(true);
  };

  const nameWarnText = () => {
    const isTrue = (
      <p id="nameWarn" className="warnTrue" hidden={hiddenName}>
        Looks good!
      </p>
    );

    const isFalse = (
      <p id="nameWarn" className="warnFalse" hidden={hiddenName}>
        Name should all filled and must not contain special character (!@#%&)!
      </p>
    );

    return /(?=.*[^A-Za-z ])/.test(fName) || fName === '' || /(?=.*[^A-Za-z ])/.test(lName) || lName === '' ? isFalse : isTrue;
  };

  const emailWarnText = () => {
    const isTrue = (
      <p id="emailWarn" className="warnTrue" hidden={hiddenEmail}>
        Looks good!
      </p>
    );

    const isFalse = (
      <p id="emailWarn" className="warnFalse" hidden={hiddenEmail}>
        Email must contain correct addresss!
      </p>
    );

    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) ? isTrue : isFalse;
  };

  const passWarnText = () => {
    const isTrue = (
      <p id="passWarn" className="warnTrue" hidden={hiddenPass}>
        Looks good!
      </p>
    );

    const isFalse = (
      <p id="passWarn" className="warnFalse" hidden={hiddenPass}>
        Password must at least 8 letters long and contain an uppercase, a lowercase, and a number!
      </p>
    );

    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) ? isTrue : isFalse;
  };

  const rePassWarnText = () => {
    const isTrue = (
      <p id="rePassWarn" className="warnTrue" hidden={hiddenRePass}>
        Looks good!
      </p>
    );

    const isFalse = (
      <p id="rePassWarn" className="warnFalse" hidden={hiddenRePass}>
        Password not match, make sure you type correctly!
      </p>
    );

    return rePass === password && rePass !== '' ? isTrue : isFalse;
  };

  const emailError = (text) => {
    return (
      <p id="emailError" className="warnError" hidden={error}>
        {text}
      </p>
    );
  };

  return (
    <div id="signinContainer">
      <div id="signinCard">
        <h1 id="signinHeading">Sign in</h1>
        <form id="signinForm" action="post" onSubmit={handleSubmit}>
          <div className="nameBox">
            <input value={fName} onChange={handleChange} onFocus={handleChange} onBlur={handleLeave} type="text" pattern="[A-Za-z ]{1,}" id="firstName" placeholder="First Name" required />
            <input value={lName} onChange={handleChange} onFocus={handleChange} onBlur={handleLeave} type="text" pattern="[A-Za-z ]{1,}" id="lastName" placeholder="Last Name" required />
          </div>
          {nameWarnText()}
          <input value={email} onChange={handleChange} onFocus={handleChange} onBlur={handleLeave} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" id="email" placeholder="Email" required />
          {emailWarnText()}
          <input value={password} onChange={handleChange} onFocus={handleChange} onBlur={handleLeave} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password" placeholder="Password" required />
          {passWarnText()}
          <input value={rePass} onChange={handleChange} onFocus={handleChange} onBlur={handleLeave} type="password" id="confirmPassword" placeholder="Re-type Password" required />
          {rePassWarnText()}
          {emailError(errorMsg)}
          <button type="submit" id="signinBtn">
            Sign in
          </button>
        </form>
        <p id="signInLink">
          Already have an account? <Link to="/login">Login</Link> here!
        </p>
      </div>
    </div>
  );
};

export default Signin;
