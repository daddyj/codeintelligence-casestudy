import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useOctokit } from "./hooks/useOctokit";
import { Pagination } from "./screens/Repositories";
import { initOctokit, setLoading } from "./store/actionCreators";
import { StoreState } from "./store/reducer";

const AppNavigation = () => {
  const { since } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = useCallback(
    (next: number) => () => {
      dispatch(setLoading());
      navigate(`/repositories?since=${next}`);
    },
    [navigate, dispatch]
  );

  return (
    <AppBar>
      <Toolbar>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Pagination since={since} onChange={handlePageChange} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const MemoizedNavigation = React.memo(AppNavigation);

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const octokit = useOctokit();
  const navigate = useNavigate();
  const { user } = useSelector((state: StoreState) => state);

  const initApp = useCallback(async () => {
    const response = await octokit?.rest.users.getAuthenticated();

    if (response?.data.login) dispatch(initOctokit(response?.data.login));
  }, [dispatch, octokit]);

  useEffect(() => {
    if (!octokit) return;
    console.log("octokit", octokit);
    initApp();
  }, [initApp, octokit]);

  useEffect(() => {
    if (user && window.location.pathname === "/")
      navigate("/repositories?since=0");
  }, [user, navigate]);

  return (
    <div className="App">
      <MemoizedNavigation />
      <Box
        sx={(theme) => ({
          padding: theme.spacing(16, 4),
          paddingBottom: 0,
        })}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default App;
