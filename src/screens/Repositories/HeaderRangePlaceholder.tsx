import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import React from "react";

export const HeaderRangePlaceholder: React.FC<any> = ({ isLoading, label }) => {
  return isLoading ? (
    <Skeleton width={100} sx={{ display: "inline-block" }} />
  ) : (
    <Typography component="span" variant="h6" color="#BCD104">
      {label}
    </Typography>
  );
};
