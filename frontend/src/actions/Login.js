import { axios } from '../api/axios'

export const Login = async ( email, pass) => {
  try {
    const res = await axios.post('/login', {email, pass});
    const { data } = res;
    return { data };
  } catch (err) {    
    return { err };
  }
};
