import React, {createContext, useContext, useState} from 'react';

const RouteNameContext = createContext();

export const RouteNameProvider = ({children}) => {
  const [currentRouteName, setCurrentRouteName] = useState(undefined);
  return (
    <RouteNameContext.Provider value={{currentRouteName, setCurrentRouteName}}>
      {children}
    </RouteNameContext.Provider>
  );
};

export const useRouteNameContext = () => useContext(RouteNameContext);
