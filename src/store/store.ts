import { createStore } from "redux";
import { initialState, reducer, StoreState } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = (preloadedState: StoreState) => {
  const composedEnhancers = composeWithDevTools();

  const store = createStore(reducer, preloadedState, composedEnhancers);

  return store;
};

const store = configureStore(initialState);

export default store;
