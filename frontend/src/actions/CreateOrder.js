
import { axios } from '../api/axios'
import { getToken } from '../utils/persistToken';

export const CreateOrder = async (productid, quantity) => {
  try{ 
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    };

    const { data } = await axios.post(`/order-create`, {productid, quantity}, config);
    return { data };
  } catch(err) {
    return { err };
  }
};

