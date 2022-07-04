import { useEffect } from "react";

const initialState = {
  data: null,
  isLoading: false,
};

const actionType = {
  DATA: "DATA",
  IS_LOADING: "IS_LOADING",
};

const reducer = (action, state) => {
  switch (action.type) {
    case actionType.DATA:
      return { ...state, data: action.payload };
    case actionType.IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    const data = await response.json();
    setData(data);
  };
  console.log(data);
  return [data, get];
};

export { useFetch };
