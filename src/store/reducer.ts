import {
  INIT_OCTOKIT,
  LOAD_PUBLIC_REPOSITORIES,
  SET_LOADING,
} from "./actionTypes";

export type StoreState = {
  user?: string;
  repositories: any[];
  updatedAt?: Date;
  since: {
    current: number;
    prev?: number;
    next?: number;
    first: number;
  };
  currentPageLoaded: boolean;
};

export const initialState = {
  repositories: [],
  since: {
    current: 0,
    first: 0,
  },
  currentPageLoaded: false,
};

export const reducer = (state: StoreState = initialState, action: any) => {
  switch (action.type) {
    case INIT_OCTOKIT: {
      const { user } = action;
      return { ...state, user };
    }
    case SET_LOADING:
      return {
        ...state,
        currentPageLoaded: false,
      };
    case LOAD_PUBLIC_REPOSITORIES:
      console.log("link", action.link);
      const [nextLinkRaw] = action.link.split(",");
      const nextSince = nextLinkRaw
        .split(";")[0]
        .split("since=")[1]
        .slice(0, -1);

      const { resetIndices } = action;

      return {
        ...state,
        updatedAt: new Date(),
        repositories: action.data,
        since: {
          ...state.since,
          current: resetIndices ? 0 : state.since.next ?? state.since.current,
          prev: resetIndices ? undefined : state.since.current,
          next: nextSince,
        },
        currentPageLoaded: true,
      };
    default:
      return { ...state };
  }
};
