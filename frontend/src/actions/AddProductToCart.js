import { axios } from '../api/axios'
import { getToken } from '../utils/persistToken';

export const AddProductToCart = async (plannerId, productid) => {
  try{ 
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    };
    const { data } = await axios.put(`/planner-add/${plannerId}`, {productid}, config);
    return { data };
  } catch(err) {
    return { err };
  }
};
