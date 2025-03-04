import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

export const Pagination: React.FC<any> = ({ since, onChange }) => {
  return (
    <>
      <Button variant="contained" onClick={onChange(0)}>
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
    </>
  );
};

export default React.memo(Pagination);
