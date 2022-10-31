import { createContext, useContext, useEffect, useState } from 'react';
import { axios } from '../api/axios';
import { persistToken, removeToken } from '../utils/persistToken';

// create a context to have a "stored" state that can be passed down to other components without using props
const authContext = createContext();

// custom  hook to access the context's values
export const useAuth = ()=> useContext(authContext);

// every child of this provider will be able to access the contexts values via the useAuth hook
export const AuthProvider = ({children}) => {
    const [state,setState] = useState({
        fetched: false,
        fetching: false,
        user: null,
    });

    const login = async (email, pass) => {
        // dev only
        persistToken('token');

        const user = await fetchMe();
        setState(prev=>({
          ...prev,
          user
        }));

        return user; 

        //
        try {
            const res = await axios.post('/login', {email, pass});
            const { token } = res.data;
            persistToken(token);
            const user = await fetchMe();
            setState(prev=>({
              ...prev,
              user
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () =>{ 
        removeToken();
        window.location = '/';  
    };

    const fetchMe = async () => {
        // dev only
        // simulate waiting for server response
        await new Promise(res => setTimeout(()=>res(), 500));
        const user = {
          id: 123,
          username: 'cool_username',
          email: 'cool_email',
          photoURL: 'https://png.pngitem.com/pimgs/s/506-5067022_sweet-shap-profile-placeholder-hd-png-download.png'
        };

        return user; 

        // request
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            };
            const { data } = await axios.get('/me', config);
            return { user: data };
        } catch (err) {
            return { err: err.message };
        }
    };

    // check whether or not there is a token that represents the user session 
    useEffect(()=>{
        // truco para evitar el problema de strictmode de react v18
        let ignore =false;
        const token = localStorage.getItem('authToken');

        if (ignore)
          return;

        if (!token) {
          setState(prev=>({
            ...prev,
            fetched: true,
            fetching: false,
            user: null,
          }));
          return;
        };

        // send verfication request to get the user
        fetchMe().then((user, err) => {
            if (err) {
                console.error(err);
            }

            if(ignore) return;

            setState(prev=>({
              ...prev,
              fetched: true,
              fetching: false,
              user: user || null,
            }));
        });

        return () => { ignore=true };
    }, []);

    const value = {
        ...state,
        login,
        logout,
        fetchMe,
    };

    return (
        <authContext.Provider value={value}>
          {children}
        </authContext.Provider>
    );
};