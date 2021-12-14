import { LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";
import { mock } from "./mock";
import { StoreState } from "./store";

export const reducer = (
  state: StoreState = { repositories: [] },
  action: any
) => {
  switch (action.type) {
    case LOAD_PUBLIC_REPOSITORIES:
      return {
        ...state,
        updatedAt: new Date(),
        repositories: [
          { url: "https://api.github.com/repositories", data: mock.data },
        ],
      };
    default:
      return { ...state };
  }
};
