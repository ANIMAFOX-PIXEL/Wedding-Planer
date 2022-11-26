import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';

import SignupComponent from '../../components/Signup/Signup';

import { Signup as SignupAction } from '../../actions/Signup';

const Signup = () => {
  const { login } = useAuth();

  const [{ username, name, email, pass, pass2, type }, setState] = useState({
    username: '',
    name: '',
    email: '',
    pass: '',
    pass2: '',
    type: 'buyer',
  });

  const handleChange = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleSignup = async () => {
    if (!username || !name || !email || !pass || !pass2) {
      alert('Llena todos los campos');
      return;
    }

    if (pass !== pass2) {
      alert('Haz que las contrasenas coincidan');
      return;
    }

    try {
      const { err, data } = await SignupAction(
        username,
        name,
        email,
        pass,
        type
      );
      if (err) {
        console.error(err);
        return;
      }

      await login(email, pass);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SignupComponent handleChange={handleChange} handleSignup={handleSignup} />
  );
};

export default Signup;
