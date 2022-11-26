import { createContext, useContext, useEffect, useState } from 'react';
import { Login } from '../actions/Login';
import { Me } from '../actions/Me';
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
        try {
          let { err: loginErr, data}  = await Login(email, pass);
          if(loginErr) {
            console.error(loginErr);
            return;
          }

          const { token } = data;
          persistToken(token);

          const { err: meErr, data: user } = await Me();
          if(meErr) {
            console.error(loginErr);
            return;
          }

          setState(prev=>({ ...prev, user }));
        } catch (err) {
          console.error(err);
        }
    };

    const logout = () =>{ 
        removeToken();
        window.location = '/';  
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
        Me()
          .then(({err, data: user}) => {
            if (err) {
              console.error(err);
              return;
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
        fetchMe: Me,
    };

    return (
        <authContext.Provider value={value}>
          {children}
        </authContext.Provider>
    );
};