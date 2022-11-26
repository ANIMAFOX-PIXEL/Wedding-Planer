import { useState, useContext, createContext } from 'react';
import { ProductSearch } from '../actions/ProductSearch';
import { axios } from '../api/axios';

const browseContext = createContext();

export const useBrowse  = () => useContext(browseContext);

export const BrowseProvider = ({children, pageSize=10}) => {

  const [state, setState] = useState({
    fetched: false,
    fetching: false,
    err: null,
    articles: [],
    pageNumber: 0,
    lastQuery: '',
  });

  const browse = async query => {
    try {
      setState( prev => ({ ...prev, fetching: true }));

      // accion de traer
      const { err, data: articles} = await ProductSearch(query);
      if (err) {
        console.error(err);
        return;
      }

      // trajo datos
      setState( prev => ({
        ...prev,
        fetched: true,
        fetching: false,
        articles,
        lastQuery: query,
      }));
    } catch (err) {
      // error trayendo datos
      setState( prev => ({
        ...prev,
        fetched: true,
        fetching: false,
        err,
      }));
    }
  };

  const value = {
    ...state,
    browse,

  };

  return (
    <browseContext.Provider value={value}>
      {children}
    </browseContext.Provider>
  );
};
