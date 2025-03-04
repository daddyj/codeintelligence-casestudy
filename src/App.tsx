import Box from "@mui/system/Box";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { AppNavigation } from "./components/AppNavigation";
import { useOctokit } from "./hooks/useOctokit";
import { initOctokit } from "./store/actionCreators";
import { StoreState } from "./store/reducer";

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);
  const octokit = useOctokit();
  const navigate = useNavigate();

  const initApp = useCallback(async () => {
    const response = await octokit?.rest.users.getAuthenticated();

    if (response?.data.login) dispatch(initOctokit(response?.data.login));
  }, [dispatch, octokit]);

  useEffect(() => {
    if (octokit) initApp();
  }, [initApp, octokit]);

  useEffect(() => {
    if (user && window.location.pathname === "/") navigate("/repositories/0");
  }, [user, navigate]);

  return (
    <div className="App">
      <AppNavigation />
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing(14),
          paddingTop: theme.spacing(2),
          paddingBottom: 0,
          backgroundColor: "#034485",
          color: "white",
          flexBasis: "100%",
        })}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default App;
