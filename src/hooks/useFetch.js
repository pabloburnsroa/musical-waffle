import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log();
    const abortController = new AbortController();
    const fetchData = async () => {
      setisPending(true);
      try {
        // Associate abortController with fetch req?? how???? use controller signal...
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setisPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('The fetch req was aborted...');
        } else {
          setisPending(false);
          setError('Could not fetch the data');
        }
      }
    };
    fetchData();
    // Clean up functions fires whenever the component that uses useEffect function in unmounts
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
