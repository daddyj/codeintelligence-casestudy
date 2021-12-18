import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useOctokit } from "../hooks/useOctokit";
import {
  setLoading,
  setRepositoriesForCurrentPage,
} from "../store/actionCreators";
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

const Pagination: React.FC<any> = ({ since, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" marginY={4}>
      <Button variant="contained" onClick={onChange(0, true)}>
        FIRST PAGE
      </Button>
      {since?.prev ? (
        <>
          <Box width={16} />
          <Button variant="contained" onClick={onChange(since.prev)}>
            PREVIOUS PAGE
          </Button>
        </>
      ) : null}
      {since?.next && (
        <>
          <Box width={16} />
          <Button variant="contained" onClick={onChange(since.next)}>
            NEXT PAGE
          </Button>
        </>
      )}
    </Box>
  );
};

export const Repositories = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const octokit = useOctokit();
  const { user, repositories, since, currentPageLoaded } = useSelector(
    (state: StoreState) => state
  );

  const loadRepositories = useCallback(
    async (since: number, resetIndices: boolean = false) => {
      const response = await octokit?.request("GET /repositories", {
        since,
      });
      console.log("public repositories", response);
      if (response?.data && response?.headers.link)
        dispatch(
          setRepositoriesForCurrentPage({
            data: response?.data,
            link: response?.headers.link,
            resetIndices,
          })
        );
    },
    [dispatch, octokit]
  );

  const handlePageChange = useCallback(
    (next: number, resetIndices = false) =>
      () => {
        dispatch(setLoading());
        loadRepositories(next, resetIndices);
      },
    [loadRepositories, dispatch]
  );

  useEffect(() => {
    if (user && repositories.length === 0) {
      loadRepositories(since.current);
    }
  }, [user, since, repositories, loadRepositories, dispatch]);

  useEffect(() => {
    console.log("currentPageLoaded", currentPageLoaded, since);
    if (currentPageLoaded) navigate(`/repositories?since=${since.current}`);
  }, [currentPageLoaded, navigate, since]);

  return (
    <>
      <Typography variant="h2">
        List of all public repositories on github
      </Typography>

      <Box
        component={Container}
        maxWidth="lg"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" marginY={4}>
          <Button variant="contained" onClick={handlePageChange(0, true)}>
            FIRST PAGE
          </Button>
          {since?.prev ? (
            <>
              <Box width={16} />
              <Button
                variant="contained"
                onClick={handlePageChange(since.prev)}
              >
                PREVIOUS PAGE
              </Button>
            </>
          ) : null}
          {since?.next && (
            <>
              <Box width={16} />
              <Button
                variant="contained"
                onClick={handlePageChange(since.next)}
              >
                NEXT PAGE
              </Button>
            </>
          )}
        </Box>

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

        <Pagination since={since} onChange={handlePageChange} />
      </Box>
    </>
  );
};

export default React.memo(Repositories);
