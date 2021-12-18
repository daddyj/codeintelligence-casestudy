import { Octokit } from "octokit";
import { INIT_OCTOKIT, LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";
import { mock } from "./mock";

export type StoreState = {
  user?: string;
  repositories: any[];
  updatedAt?: Date;
  currentPage: number;
  isLoading: boolean;
};

export const initialState = {
  repositories: [],
  currentPage: 1,
  isLoading: false,
};

export const reducer = (state: StoreState = initialState, action: any) => {
  // const data = mock.data;

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
      };
    default:
      return { ...state };
  }
};
