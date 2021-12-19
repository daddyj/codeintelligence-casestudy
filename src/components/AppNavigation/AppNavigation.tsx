import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
      <Box
        component={Toolbar}
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ backgroundColor: "#DDD" }}
      >
        <Box marginY={1} display="flex" alignItems="center">
          <GitHubIcon sx={{ color: "black" }} />
          <Box component={Typography} marginX={1} sx={{ color: "black" }}>
            -
          </Box>
          <Typography variant="h5" sx={{ color: "black" }}>
            Case Study
          </Typography>
        </Box>
        <Pagination
          since={{ ...since, current: currentRepoIndexSince }}
          onChange={handlePageChange}
        />
      </Box>
    </AppBar>
  );
};

export default React.memo(AppNavigation);
