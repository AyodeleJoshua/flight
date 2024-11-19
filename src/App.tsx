import { useEffect } from 'react';
import Router from './router';
import { getItemFromLocalStorage } from './utils/localStorageOperations';
import constants from './utils/constants';
import { useAuth } from './context/auth';
import actionTypes from './context/auth/actionTypes';

function App() {
  const { dispatch } = useAuth();

  useEffect(() => {
    const savedUserInfo = getItemFromLocalStorage(constants.USER_INFO);
    if (savedUserInfo) {
      dispatch({
        type: actionTypes.LOGIN,
        payload: { ...JSON.parse(savedUserInfo) },
      });
    }
  }, []);

  return <Router />;
}

export default App;
