import React, { useState } from 'react';

import SignupComponent from '../../components/Signup/Signup';
import { useAuth } from '../../hooks/auth';

const Signup = () => {
  const { login } = useAuth();

  const [{ email, pass, pass2 }, setState] = useState({
    email: '',
    pass: '',
    pass2: '',
  });

  const handleChange = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleLogin = () => {
    login(email, pass);
  };

  return (
    <SignupComponent handleChange={handleChange} handleLogin={handleLogin} />
  );
};

export default Signup;
