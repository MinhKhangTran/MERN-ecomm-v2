import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Switch, Route, Redirect } from "react-router-dom";
// Layout
import Layout from "./components/Layout";

// Pages
import ProductList from "./features/products/ProductList";
import SingleProduct from "./features/products/SingleProduct";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import CartPage from "./features/cart/CartPage";
import ShippingPage from "./pages/ShippingPage";

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
    component: ProductList,
    private: false,
  },
  {
    path: "/products/:id",
    exact: false,
    component: SingleProduct,
    private: false,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
    private: false,
  },
  {
    path: "/register",
    exact: false,
    component: Register,
    private: false,
  },
  {
    path: "/cart/:id?",
    exact: false,
    component: CartPage,
    private: false,
  },
  {
    path: "/shipping",
    exact: false,
    component: ShippingPage,
    private: true,
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
