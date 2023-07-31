import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    async (requestConfig: any, applyData: (data: any) => void) => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        });

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }

        const data = await response.json();
        applyData(data);
      } catch (err: any) {
        console.log('There was an error');
        setError(err.message || 'Something went wrong!'); //this isn't working!
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
