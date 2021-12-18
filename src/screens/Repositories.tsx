import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import queryString from "query-string";
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

export const Pagination: React.FC<any> = ({ since, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" marginY={4}>
      <Button variant="contained" onClick={onChange(0, true)}>
        FIRST PAGE
      </Button>
      {since?.next ? (
        <>
          <Box width={16} />
          <Button variant="contained" onClick={onChange(since.next)}>
            NEXT PAGE
          </Button>
        </>
      ) : null}
    </Box>
  );
};

export const Repositories = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const octokit = useOctokit();
  const { user, repositories, currentPageLoaded } = useSelector(
    (state: StoreState) => state
  );

  const loadRepositories = useCallback(
    async (since: number) => {
      const response = await octokit?.request("GET /repositories", {
        since,
      });
      console.log("public repositories", response);
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
    const parsed = queryString.parse(window.location.search);

    console.log("params", parsed.since);
    if (parsed.since && user && !currentPageLoaded) {
      loadRepositories(+parsed.since);
      return;
    }
  }, [user, currentPageLoaded, loadRepositories]);

  return (
    <>
      {repositories.length > 0 && (
        <Typography variant="h5">
          List of all public repositories from{" "}
          <Typography component="span" variant="h6" color="primary">
            {repositories?.[0]?.name}
          </Typography>{" "}
          to{" "}
          <Typography component="span" variant="h6" color="primary">
            {repositories?.[repositories.length - 1]?.name}
          </Typography>
        </Typography>
      )}

      <Box
        component={Container}
        maxWidth="lg"
        display="flex"
        flexDirection="column"
      >
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
            {!currentPageLoaded ? (
              <>
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
                <SkeletonTemplate />
              </>
            ) : (
              repositories?.map((repository: any) => {
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
      </Box>
    </>
  );
};

export default React.memo(Repositories);
