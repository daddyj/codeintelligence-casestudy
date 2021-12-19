import {
  CLEAR_REPOSITORIES,
  INIT_OCTOKIT,
  LOAD_PUBLIC_REPOSITORIES,
} from "./actionTypes";

export const initOctokit = (user: string) => {
  return {
    type: INIT_OCTOKIT,
    user,
  };
};

export const clearRepositories = () => ({
  type: CLEAR_REPOSITORIES,
});

export const setRepositoriesForCurrentPage = ({
  data,
  link,
  resetIndices,
}: any) => ({
  type: LOAD_PUBLIC_REPOSITORIES,
  data,
  link,
  resetIndices,
});
