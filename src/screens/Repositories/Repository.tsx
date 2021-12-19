import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React from "react";

export const Repository: React.FC<any> = ({ repository }) => {
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
          <Typography variant="body2">{repository.description}</Typography>
        </Box>
      </Box>
      <Button component={RouterLink} to={`/repository/${repository.id}`}>
        Contributors
      </Button>
    </Paper>
  );
};

export default React.memo(Repository);
