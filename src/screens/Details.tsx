import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useOctokit } from "../hooks/useOctokit";
import { StoreState } from "../store/reducer";

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
          <Paper
            variant="outlined"
            sx={{
              marginY: 1,
              marginX: 3,
              paddingX: 4,
              paddingY: 2,
            }}
            key={contributor.login}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {contributor.avatar_url ? (
                <Avatar
                  alt={`avatar-${contributor.login}`}
                  src={contributor.avatar_url}
                />
              ) : (
                <GitHubIcon />
              )}
              <Typography variant="subtitle2" sx={{ flexBasis: "50%" }}>
                {contributor.login}
              </Typography>
              <Typography variant="body2">
                Contributions{" "}
                <Typography fontWeight="bold">
                  {contributor.contributions}
                </Typography>
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};
