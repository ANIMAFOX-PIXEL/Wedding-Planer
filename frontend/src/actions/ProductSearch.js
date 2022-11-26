import { axios } from '../api/axios'
import { getToken } from '../utils/persistToken';

export const ProductSearch = async query => {
  try{ 
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    };
    const route = '/product-search'.concat(...( query ? `?query=${query}` : []));
    const { data } = await axios.get(route, config);
    return { data }
  } catch(err) {
    return { err };
  }
};
