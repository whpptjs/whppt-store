import React, { createContext, FC, ReactElement, useContext, useMemo } from 'react';
import { Api } from '../Api';

export const WhpptStore = createContext({
  storeApi: Api(),
});

WhpptStore.displayName = 'WhpptStoreContext';

export const useWhpptStore = () => {
  return useContext(WhpptStore);
};

export const WhpptStoreApp: FC<{
  children: ReactElement | ReactElement[];
}> = ({ children }) => {
  const context = useMemo(() => {
    return { storeApi: Api() };
  }, []);

  return <WhpptStore.Provider value={context}>{children}</WhpptStore.Provider>;
};
