import { INIT_OCTOKIT, LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";

export type StoreState = {
  user?: string;
  repositories: any[];
  updatedAt?: Date;
  currentPage: number;
  currentPageLoaded: boolean;
  isLoading: boolean;
};

export const initialState = {
  repositories: [],
  currentPage: 1,
  currentPageLoaded: false,
  isLoading: false,
};

export const reducer = (state: StoreState = initialState, action: any) => {
  switch (action.type) {
    case INIT_OCTOKIT: {
      const { user } = action;
      return { ...state, user };
    }
    case LOAD_PUBLIC_REPOSITORIES:
      return {
        ...state,
        updatedAt: new Date(),
        repositories: Array.from(
          new Set([...initialState.repositories, ...action.payload])
        ),
        currentPageLoaded: true,
      };
    default:
      return { ...state };
  }
};
