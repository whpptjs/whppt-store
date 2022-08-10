import React, { createContext, FC, ReactElement, useContext, useMemo } from 'react';
import { ProductField, Api } from '../index';

export const WhpptStore = createContext({
  storeApi: Api(),
  productFields: [] as ProductField[],
});

WhpptStore.displayName = 'WhpptStoreContext';

export const useWhpptStore = () => {
  return useContext(WhpptStore);
};

export const WhpptStoreApp: FC<{
  productFields?: any[];
  children: ReactElement | ReactElement[];
}> = ({ productFields = [], children }) => {
  const context = useMemo(() => {
    return { storeApi: Api(), productFields };
  }, [productFields]);

  return <WhpptStore.Provider value={context}>{children}</WhpptStore.Provider>;
};
