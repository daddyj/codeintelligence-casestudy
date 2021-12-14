import { createStore } from "redux";
import { initialState, reducer, StoreState } from "./reducer";

const configureStore = (preloadedState: StoreState) => {
  const store = createStore(reducer, preloadedState);

  return store;
};

const store = configureStore(initialState);

export default store;
