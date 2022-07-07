import { useEffect, useReducer } from "react";

const initialState = {
  data: null,
  isLoading: false,
};

const actionType = {
  DATA: "DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.DATA:
      return {
        ...state,
        data: action.payload.data,
        isLoading: action.payload.isLoading,
      };
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

  const get = async (getData = true) => {
    try {
      if (getData) {
        dispatch({ type: actionType.DATA, payload: { isLoading: true } });
        const response = await fetch(url);
        const data = await response.json();
        dispatch({
          type: actionType.DATA,
          payload: { data, isLoading: false },
        });
      } else {
        dispatch({
          type: actionType.DATA,
          payload: { data: null, isLoading: false },
        });
      }
    } catch (err) {
      throw new Error(`useFetch: Error in get request: ${err}`);
    }
  };

  return [{ data: state.data, isLoading: state.isLoading }, get];
};

export { useFetch };
