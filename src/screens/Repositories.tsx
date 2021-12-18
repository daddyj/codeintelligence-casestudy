import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Outlet, useParams } from "react-router-dom";
import { useOctokit } from "../hooks/useOctokit";
import { setRepositoriesForCurrentPage } from "../store/actionCreators";
import { StoreState } from "../store/reducer";

const SkeletonTemplate = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        marginY: 1,
        paddingX: 2,
        paddingY: 1,
      }}
    >
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        sx={{ margin: "0 auto" }}
      />
      <Skeleton width={100} sx={{ margin: "0 auto" }} />
      <Skeleton />
      <Skeleton sx={{ width: "50%", margin: "0 auto" }} />
      <Skeleton
        variant="rectangular"
        width={100}
        height={25}
        sx={{ margin: "0 auto" }}
      />
    </Paper>
  );
};

export const Repositories = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const octokit = useOctokit();
  const { user, repositories, currentPage, currentPageLoaded } = useSelector(
    (state: StoreState) => state
  );

  const loadRepositoriesForCurrentPage = useCallback(async () => {
    const pageUrl = currentPage === 1 ? "/repositories" : "#";
    const response = await octokit?.request(`GET ${pageUrl}`);
    console.log("public repositories", response);
    if (response?.data) dispatch(setRepositoriesForCurrentPage(response?.data));
  }, [currentPage, dispatch, octokit]);

  useEffect(() => {
    if (!user || currentPageLoaded) return;

    loadRepositoriesForCurrentPage();
  }, [user, currentPageLoaded, loadRepositoriesForCurrentPage]);

  return (
    <>
      <Typography variant="h2">
        List of all public repositories on github
      </Typography>

      <Container>
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
              height: "60vh",
              [theme.breakpoints.only("xs")]: {
                height: "10vh",
                overflow: "hidden",
              },
            })}
          >
            {!user && repositories.length === 0 ? (
              <>
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
              </>
            ) : (
              repositories?.map((repository: any) => {
                console.log("repo data", repository);

                return (
                  <Paper
                    variant="outlined"
                    sx={{
                      marginY: 1,
                      paddingX: 2,
                      paddingY: 1,
                      backgroundColor:
                        +params.idRepository! === repository.id
                          ? "silver"
                          : "inherit",
                    }}
                    key={repository.id}
                  >
                    <GitHubIcon />
                    <Typography variant="subtitle2">
                      {repository.name}
                    </Typography>
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
                          {repository.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      component={RouterLink}
                      to={`/repositories/${repository.id}`}
                    >
                      Contributors
                    </Button>
                  </Paper>
                );
              })
            )}
          </Box>
          {params.idRepository && (
            <Box display="flex" flexBasis="80%">
              <Outlet />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default React.memo(Repositories);
