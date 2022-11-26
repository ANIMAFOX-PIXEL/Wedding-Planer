import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddProductToCart } from '../actions/AddProductToCart';
import { PlannerFindOrCreate } from '../actions/PlannerFindOrCreate';

const plannerContext = createContext();

export const usePlanner = ()=> useContext(plannerContext);

export const PlannerProvider = ({children}) => {
  const [{
    fetched,
    fetching,
    planner
  },setState] = useState({
    fetched: false,
    fetching: false,
    planner: null,
  });

  const loadPlanner = async () => {
    setState(prev => ({...prev, fetching: true}));
    const {err, data } = await PlannerFindOrCreate();
    if (err) {
      console.error(err);
      return { err };
    }
    setState(prev => ({...prev, fetched: true, fetching: false, planner: data}));
    return { data };
  };

  useEffect(()=>{
    loadPlanner();
  }, [])

  const value =  {
    fetched,
    fetching,
    planner,
    loadPlanner
  };

  return (
    <plannerContext.Provider value={value}>
      { children }
    </plannerContext.Provider>
  )
};