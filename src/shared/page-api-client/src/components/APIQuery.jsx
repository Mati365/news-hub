import {useAPIContext} from './APIContext';

const useAPIQuery = (queryParams) => {
  const client = useAPIContext();

  return client.get(queryParams);
};

const APIQuery = ({children, ...props}) => {
  const apiQuery = useAPIQuery(props);

  return children(apiQuery);
};

APIQuery.displayName = 'APIQuery';

export default APIQuery;
