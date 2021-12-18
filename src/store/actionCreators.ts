import {
  INIT_OCTOKIT,
  LOAD_PUBLIC_REPOSITORIES,
  SET_LOADING,
} from "./actionTypes";

export const initOctokit = (user: string) => {
  return {
    type: INIT_OCTOKIT,
    user,
  };
};

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

export const setLoading = () => ({
  type: SET_LOADING,
});
