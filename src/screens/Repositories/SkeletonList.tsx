import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const SkeletonTemplateListItem: React.FC<any> = () => {
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

export const SkeletonList = () => {
  return (
    <>
      <SkeletonTemplateListItem />
      <SkeletonTemplateListItem />
      <SkeletonTemplateListItem />
      <SkeletonTemplateListItem />
      <SkeletonTemplateListItem />
    </>
  );
};
