import { axios } from '../api/axios'
import { getToken } from "../utils/persistToken";

export const Me = async () => {
  try {
    const config = {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    };
    const { data } = await axios.get('/me', config);
    return { data };
  } catch (err) {    
    return { err };
  }
};
