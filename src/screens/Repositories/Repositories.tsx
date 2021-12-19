import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Repository } from ".";
import { useOctokit } from "../../hooks/useOctokit";
import { setRepositoriesForCurrentPage } from "../../store/actionCreators";
import { StoreState } from "../../store/reducer";
import { HeaderRangePlaceholder } from "./HeaderRangePlaceholder";
import { SkeletonList } from "./SkeletonList";

export const Repositories = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user, repositories } = useSelector((state: StoreState) => state);
  const octokit = useOctokit();

  const loadRepositories = useCallback(
    async (since: number) => {
      const response = await octokit?.request("GET /repositories", {
        since,
      });

      if (response?.data && response?.headers.link)
        dispatch(
          setRepositoriesForCurrentPage({
            data: response?.data,
            link: response?.headers.link,
          })
        );
    },
    [dispatch, octokit]
  );

  useEffect(() => {
    if (!!params.idSince && user) {
      loadRepositories(+params.idSince);
    }
  }, [loadRepositories, params, user]);

  return (
    <>
      <Typography variant="h5">
        List of all public repositories from{" "}
        <HeaderRangePlaceholder
          isLoading={repositories.length === 0}
          label={repositories?.[0]?.name}
        />{" "}
        to{" "}
        <HeaderRangePlaceholder
          isLoading={repositories.length === 0}
          label={repositories?.[repositories.length - 1]?.name}
        />
      </Typography>

      <Container maxWidth="md">
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            sx={(theme) => ({
              [theme.breakpoints.only("xs")]: { flexDirection: "column" },
            })}
          >
            <Box
              display="flex"
              flexDirection="column"
              paddingY={2}
              flexBasis={params.idRepository ? "20%" : "100%"}
              overflow="scroll"
              sx={(theme) => ({
                [theme.breakpoints.only("xs")]: {
                  height: "10vh",
                  overflow: "hidden",
                },
              })}
            >
              {repositories.length === 0 ? (
                <SkeletonList />
              ) : (
                repositories?.map((repository: any) => (
                  <Repository repository={repository} />
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default React.memo(Repositories);
