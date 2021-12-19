import GitHubIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

export const Contributor: React.FC<any> = ({ contributor }) => {
  return (
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
      <Box display="flex" alignItems="center" justifyContent="space-around">
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
          <Typography component="span" fontWeight="bold">
            {contributor.contributions}
          </Typography>
        </Typography>
      </Box>
    </Paper>
  );
};

export default React.memo(Contributor);
