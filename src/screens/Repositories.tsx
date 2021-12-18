import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, Outlet, useParams } from "react-router-dom";
import { StoreState } from "../store/reducer";

export const Repositories = () => {
  const params = useParams();
  const repositories = useSelector((state: StoreState) => state.repositories);

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
            {repositories?.map((repository: any) => {
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
                  <Typography variant="subtitle2">{repository.name}</Typography>
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
            })}
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
