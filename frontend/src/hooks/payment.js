import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddProductToCart } from '../actions/AddProductToCart';
import { FetchProduct } from '../actions/FetchProduct';
import { PlannerFindOrCreate } from '../actions/PlannerFindOrCreate';

const paymentContext = createContext();

export const usePayment = ()=> useContext(paymentContext);

export const PaymentProvider = ({children}) => {
  const [params] = useSearchParams();

  const [{
      fetched,
      fetching,
      planner,
      total,
    },
    setState
  ] = useState({
    fetched: false,
    fetching: false,
    planner: null,
    total: 0,
  });

  const loadPlanner = async () => {
    setState(prev => ({...prev, fetching: true}));
    const {err, data } = await PlannerFindOrCreate();
    if (err) {
      console.error(err);
      return { err };
    }

    const total = data.products.reduce((run, cur)=> run + cur.price, 0);
    setState(prev => ({...prev, fetched: true, fetching: false, planner: data, total}));
    return { data };
  };

  const loadProduct = async () => {

    const id = params.get('article');
    if (!id){
      setState(prev => ({...prev, fetched: true, fetching: false}));
      return;
    }

    const {err, data} = await FetchProduct(id);
    if (err) {
      setState(prev =>({...prev, fetched: true, fetching: false}));
      console.error(err);
      return;
    }

    setState(prev =>({...prev, fetched: true, fetching: false, article: data, total: data.price}));
  };

  useEffect(()=>{
    if (window.location.href.includes('/payment/cart'))
      loadPlanner();
    else 
      loadProduct();
  }, [])

  const value =  {
    fetched,
    fetching,
    planner,
    total,
    loadPlanner,
  };

  return (
    <paymentContext.Provider value={value}>
      { children }
    </paymentContext.Provider>
  )
};