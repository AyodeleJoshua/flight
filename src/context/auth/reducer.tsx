import ACTIONS from './actionTypes';

export const initialState = {
  id: '',
  name: '',
  email: '',
  isLoggedIn: false,
};

const authReducer = (
  state: { id: string; name: string; email: string; isLoggedIn: boolean },
  action: {
    type: string;
    payload: { id: string; name: string; email: string };
  },
) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
    case ACTIONS.UPDATE:
      const { id, name, email } = action.payload;
      return {
        ...state,
        id,
        name,
        email,
        isLoggedIn: true,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      throw new Error(`action type: ${action.type} may not exist`);
  }
};

export default authReducer;
