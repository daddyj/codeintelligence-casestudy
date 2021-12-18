import { INIT_OCTOKIT, LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";

export const initOctokit = (user: string) => {
  return {
    type: INIT_OCTOKIT,
    user,
  };
};

export const setRepositoriesForCurrentPage = (repositories: any[]) => ({
  type: LOAD_PUBLIC_REPOSITORIES,
  payload: repositories,
});
