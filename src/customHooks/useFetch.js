import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  let isMounted = true;

  const cleanup = () => {
    isMounted = false;
    return isMounted;
  };

  useEffect(() => {
    return cleanup();
  });

  const get = async () => {
    const response = await fetch(url);
    const data = response.json();
    setData(data);
  };

  return [data, get];
};

export { useFetch };
