import { useParams, useSearchParams } from 'react-router-dom';

export const withRouteParams = (Component) => 
  props => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    return (
      <Component params={params} searchParams={searchParams} {...props}/>
    );
  }