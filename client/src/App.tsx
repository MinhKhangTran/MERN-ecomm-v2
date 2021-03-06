import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Switch, Route, Redirect } from "react-router-dom";
// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";

// Redux
import { useSelector } from "react-redux";
// Rootstate
import { RootState } from "./store";

// types
interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  private: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    private: false,
  },
];

export default function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          );
        })}
      </Switch>
    </Layout>
  );
}
