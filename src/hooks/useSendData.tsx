import { useState, useCallback } from 'react';
import { useAppDispatch } from '../hooks';

import { uiActions } from '../store/store';

const useSendData = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const sendData = useCallback(
    async (requestConfig: { url: string; method: string; body: any }) => {
      setIsLoading(true);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestConfig.body),
        });

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }
      } catch (err: any) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error Saving Data to Server',
            message: err.message || 'Something went wrong!',
          })
        );
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendData,
  };
};

export default useSendData;
