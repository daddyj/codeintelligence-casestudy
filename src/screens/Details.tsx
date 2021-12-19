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
    <Container maxWidth="lg">
      <Typography variant="h3">Contributors for {metaInfo.name}</Typography>
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
          >
            {contributor.avatar_url ? (
              <Avatar
                alt={`avatar-${contributor.login}`}
                src={contributor.avatar_url}
                sx={{ margin: "0 auto" }}
              />
            ) : (
              <GitHubIcon />
            )}
            <Typography variant="subtitle2">{contributor.login}</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              sx={(theme) => ({
                [theme.breakpoints.only("xs")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Box flex={1}>
                <Typography variant="body2">
                  Contributions: {contributor.contributions}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};
