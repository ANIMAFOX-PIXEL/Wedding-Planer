export const persistToken = token => localStorage.setItem( 'authToken', token);

export const removeToken = () => localStorage.removeItem('authToken');