import { INIT_OCTOKIT, LOAD_PUBLIC_REPOSITORIES } from "./actionTypes";

export const initOctokit = () => ({
  action: INIT_OCTOKIT,
});

export const loadPublicRepositories = () => ({
  action: LOAD_PUBLIC_REPOSITORIES,
});
