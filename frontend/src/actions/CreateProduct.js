
import { axios } from '../api/axios'
import { getToken } from '../utils/persistToken';

export const CreateProduct = async (name, price, tags, description, images) => {
  try{ 
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      },
    };

    const fd = new FormData();
    fd.set('name', name);
    fd.set('price', price);
    fd.set('tags', tags);
    fd.set('description', description);
    for( const image of images)
      fd.append('images', image);

    const { data } = await axios.post(`/product-create`, fd, config);
    return { data };
  } catch(err) {
    return { err };
  }
};

