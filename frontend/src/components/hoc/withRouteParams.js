import { Navigate, useParams } from 'react-router-dom';

export const withRouteParams = (Component, config={
  requiredParams: [],
  fallback: '/'
}) => 
  props => {
    const params = useParams();
    const keys = Object.keys(params);
    if (!config.requiredParams.every(x=>keys.includes(x))) {
      return <Navigate to={config.fallback} />;
    }

    return (
      <Component params={params} {...props}/>
    );
  }