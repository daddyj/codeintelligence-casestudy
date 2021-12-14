import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
