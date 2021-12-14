import { createStore } from "redux";
import { reducer } from "./reducer";

export type StoreState = {
  repositories: any[];
  updatedAt?: Date;
};

const configureStore = (preloadedState: StoreState) => {
  const store = createStore(reducer, preloadedState);

  return store;
};

const store = configureStore({ repositories: [] });

export default store;
