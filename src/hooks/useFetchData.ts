import { useState, useCallback } from 'react';
import { useAppDispatch } from './typedHooks';

import { uiActions } from '../store/ui-slice';

const useFetchData = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (
      url: string,
      warningMessage: string,
      storeData: (data: any) => void
    ) => {
      try {
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }

        const data = await response.json();
        storeData(data);
      } catch (err: any) {
        dispatch(
          uiActions.showNotification({
            status: 'warning',
            title: warningMessage,
            message: '',
          })
        );
      }
      setIsLoading(false);
    },
    [dispatch]
  );
  return { isLoading, fetchData };
};

export default useFetchData;
