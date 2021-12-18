import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useOctokit } from "./hooks/useOctokit";
import { initOctokit } from "./store/actionCreators";

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const octokit = useOctokit();

  const initApp = useCallback(async () => {
    const response = await octokit?.rest.users.getAuthenticated();

    if (response?.data.login) dispatch(initOctokit(response?.data.login));
  }, [dispatch, octokit]);

  useEffect(() => {
    if (!octokit) return;
    console.log("octokit", octokit);
    initApp();
  }, [initApp, octokit]);

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Box display="flex" width="100%">
            <Typography>CASE STUDY</Typography>
            <Box flex={1} />
            <Link to="/repositories">Show repositories</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={(theme) => ({
          padding: theme.spacing(12, 4),
        })}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default App;
