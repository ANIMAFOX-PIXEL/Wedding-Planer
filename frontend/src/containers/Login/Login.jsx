import React, { useState } from 'react';

import LoginComponent from '../../components/Login/Login';
import { useAuth } from '../../hooks/auth';

const Login = () => {
  const { login } = useAuth();

  const [{ email, pass }, setState] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleLogin = () => {
    login(email, pass);
  };

  return (
    <LoginComponent handleChange={handleChange} handleLogin={handleLogin} />
  );
};

export default Login;
