import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearRepositories } from "../../store/actionCreators";
import { StoreState } from "../../store/reducer";
import { Pagination } from "../Pagination";

const AppNavigation = () => {
  const dispatch = useDispatch();
  const { since } = useSelector((state: StoreState) => state);
  const navigate = useNavigate();
  const params = useParams();

  const handlePageChange = useCallback(
    (next: number) => () => {
      dispatch(clearRepositories());
      navigate(`/repositories/${next}`, { state: { resetLoading: true } });
    },
    [dispatch, navigate]
  );

  const currentRepoIndexSince = params.idSince ?? 0;

  return (
    <AppBar>
      <Toolbar>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Pagination
            since={{ ...since, current: currentRepoIndexSince }}
            onChange={handlePageChange}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(AppNavigation);
