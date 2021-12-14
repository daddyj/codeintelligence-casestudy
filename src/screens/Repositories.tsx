import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Repositories = () => {
  const repositories = useSelector((state) => state.repositories);
  return (
    <>
      <Typography variant="h2">
        List of all public repositories on github
      </Typography>
    </>
  );
};

export default React.memo(Repositories);
