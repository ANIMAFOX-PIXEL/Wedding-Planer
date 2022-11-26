import { axios } from '../api/axios'

export const Signup = async (username, name, email, password, type) => {
  try {
    const res = await axios.post('/user-create', {username, name, email, password, type});
    const { data } = res;
    return { data };
  } catch (err) {    
    return { err };
  }
};
