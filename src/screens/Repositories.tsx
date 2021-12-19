import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useOctokit } from "../hooks/useOctokit";
import { setRepositoriesForCurrentPage } from "../store/actionCreators";
import { StoreState } from "../store/reducer";

const SkeletonTemplateListItem = () => {
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

const HeaderIntervalLabel: React.FC<any> = ({ isLoading, label }) => {
  return isLoading ? (
    <Skeleton width={100} sx={{ display: "inline-block" }} />
  ) : (
    <Typography component="span" variant="h6" color="#BCD104">
      {label}
    </Typography>
  );
};

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
        <HeaderIntervalLabel
          isLoading={repositories.length === 0}
          label={repositories?.[0]?.name}
        />{" "}
        to{" "}
        <HeaderIntervalLabel
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
                <>
                  <SkeletonTemplateListItem />
                  <SkeletonTemplateListItem />
                  <SkeletonTemplateListItem />
                  <SkeletonTemplateListItem />
                  <SkeletonTemplateListItem />
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
                        backgroundColor: "white",
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
                        to={`/repository/${repository.id}`}
                      >
                        Contributors
                      </Button>
                    </Paper>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default React.memo(Repositories);
