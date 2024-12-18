// UserContext.js

import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  colaborador: null, // Inicialmente, não há colaborador
};

const UserContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const actions = {
    setColaborador(state, action) {
      const { idCol } = action.payload;
      return {
        ...state,
        colaborador: { idCol },
      };
    },
  };

const reducer = (state, action) => {
  const fn = actions[action.type];
  return fn ? fn(state, action) : state;
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const enhancedDispatch = (action) => {
    
    dispatch(action);
  };

  return (
    <UserContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }
  return context;
};

export default UserContext;
