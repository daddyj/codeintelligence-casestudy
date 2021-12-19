import {
  CLEAR_REPOSITORIES,
  INIT_OCTOKIT,
  LOAD_PUBLIC_REPOSITORIES,
} from "./actionTypes";

export type StoreState = {
  user?: string;
  repositories: any[];
  updatedAt?: Date;
  since: {
    next: number;
  };
};

export const initialState = {
  repositories: [],
  since: {
    next: 0,
  },
};

const getNextPageParameter = (link: string) => {
  console.log("link", link);
  const [nextLinkRaw] = link.split(",");
  return +nextLinkRaw.split(";")[0].split("since=")[1].slice(0, -1); // sorry for the line :))
};

export const reducer = (state: StoreState = initialState, action: any) => {
  switch (action.type) {
    case INIT_OCTOKIT: {
      const { user } = action;
      return { ...state, user };
    }
    case CLEAR_REPOSITORIES:
      return {
        ...state,
        repositories: [],
      };
    case LOAD_PUBLIC_REPOSITORIES:
      return {
        ...state,
        updatedAt: new Date(),
        repositories: action.data,
        since: {
          next: getNextPageParameter(action.link),
        },
      };
    default:
      return { ...state };
  }
};
