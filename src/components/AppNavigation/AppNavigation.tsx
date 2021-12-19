import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearRepositories } from "../../store/actionCreators";
import { StoreState } from "../../store/reducer";
import { Pagination } from "../Pagination";

const GoBack: React.FC<any> = () => {
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => navigate(-1)}>
      Go Back
    </Button>
  );
};

const AppNavigation = () => {
  const dispatch = useDispatch();
  const { since } = useSelector((state: StoreState) => state);
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();

  const handlePageChange = useCallback(
    (next: number) => () => {
      dispatch(clearRepositories());
      navigate(`/repositories/${next}`);
    },
    [dispatch, navigate]
  );

  const isDetailPage = pathname.includes("repository");

  const currentRepoIndexSince = params.idSince ?? 0;

  return (
    <AppBar>
      <Paper elevation={6}>
        <Box
          component={Toolbar}
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ backgroundColor: "#788509" }}
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
          <Box display="flex" justifyContent="center" marginY={2}>
            {isDetailPage ? (
              <GoBack />
            ) : (
              <Pagination
                since={{ ...since, current: currentRepoIndexSince }}
                onChange={handlePageChange}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </AppBar>
  );
};

export default React.memo(AppNavigation);
