import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Contributor } from ".";
import { useOctokit } from "../../hooks/useOctokit";
import { StoreState } from "../../store/reducer";

export const Details: React.FC<{}> = () => {
  const params = useParams();
  const octokit = useOctokit();
  const metaInfo = useSelector((state: StoreState) =>
    state.repositories.find(
      (repository: any) => repository.id === +(params.idRepository ?? -1)
    )
  );

  const [contributors, setContributors] = useState<any[]>([]);

  const loadRepoInfo = useCallback(async () => {
    const response = await octokit?.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: metaInfo.owner.login,
        repo: metaInfo.name,
      }
    );

    if (response?.data) setContributors(response?.data);
  }, [metaInfo.name, metaInfo.owner.login, octokit]);

  useEffect(() => {
    if (metaInfo) loadRepoInfo();
  }, [loadRepoInfo, metaInfo]);

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">
        Contributors for{" "}
        <Typography color="#BCD104">{metaInfo.name}</Typography>
      </Typography>
      <Box display="flex" flexDirection="column" marginY={2}>
        {contributors.map((contributor: any) => (
          <Contributor contributor={contributor} />
        ))}
      </Box>
    </Container>
  );
};

export default React.memo(Details);
