import { axios } from '../api/axios'
import { getToken } from '../utils/persistToken';

export const FetchArticle = async id => {
  try{ 
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    };
    const { data } = await axios.get(`/product-read/${id}`, config);
    return { data };
  } catch(err) {
    return { err };
  }
};
