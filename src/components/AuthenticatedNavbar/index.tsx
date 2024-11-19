import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Button from '../../lib/Button';
import actionTypes from '../../context/auth/actionTypes';
import { removeAllItemsFromLocalStorage } from '../../utils/localStorageOperations';
import styles from './navbar.module.css';

const AuthenticatedNavbar = () => {
  const { state: userInfo, dispatch } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/flights" className={styles.link}>
          Flights
        </Link>
        <Link to="/flights/new" className={styles.link}>
          New Flight
        </Link>
      </div>
      <div>
        <div className={styles['user-name']}>{userInfo.name}</div>
        <Button
          onClick={() => {
            dispatch({
              type: actionTypes.LOGOUT,
              payload: { id: '', name: '', email: '' },
            });
            navigate('/auth/login');
            removeAllItemsFromLocalStorage();
          }}
        //   className={styles.button}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
