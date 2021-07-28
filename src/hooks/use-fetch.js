import { useState, useEffect } from "react";

const useFetch = url => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          setError(true);
          throw new Error();
        }
        
        setData(await response.json());
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };
    
    fetchData();
  }, [url]);

  return [data, isLoading, error];
};

export default useFetch;