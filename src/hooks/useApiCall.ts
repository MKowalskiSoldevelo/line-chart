import { useState, useEffect } from 'react';

export const useApiCall = <T>(url: string, call = true) => {
  const [response, setResponse] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    if (call) {
      fetch(url, {signal})
        .then(response => response.json())
        .then(response => setResponse(response));

      return () => {
        controller.abort();
      }
    };
  }, [url, call]);

  return response as unknown as T;
};