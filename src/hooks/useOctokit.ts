import { Octokit } from "octokit";
import { useState, useEffect } from "react";

export const useOctokit = () => {
  const [octokit, setOctokit] = useState<Octokit>();

  useEffect(() => {
    const instance = new Octokit({
      auth: "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",
    });

    setOctokit(instance);
  }, []);

  return octokit;
};
