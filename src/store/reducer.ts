import { LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";
import { mock } from "./mock";

export type StoreState = {
  repositories: any[];
  updatedAt?: Date;
  currentPage: number;
};

export const initialState = { repositories: [], currentPage: 1 };

export const reducer = (state: StoreState = initialState, action: any) => {
  const data = mock.data;

  switch (action.type) {
    case LOAD_PUBLIC_REPOSITORIES:
      return {
        ...state,
        updatedAt: new Date(),
        repositories: Array.from(
          new Set([...initialState.repositories, ...data])
        ),
      };
    default:
      return { ...state };
  }
};
