import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
// Layout
import Layout from "./components/Layout";

// Pages
import ProductList from "./features/products/ProductList";
import SingleProduct from "./features/products/SingleProduct";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import CartPage from "./features/cart/CartPage";
import ShippingPage from "./pages/ShippingPage";
import CheckoutPage from "./pages/CheckoutPage";
import ErrorPage from "./pages/ErrorPage";

// Redux
import { useSelector } from "react-redux";
// Rootstate
import { RootState } from "./store";
import UserUpdate from "./features/users/UserUpdate";

// types
interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  private: boolean;
  admin: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: ProductList,
    private: false,
    admin: false,
  },
  {
    path: "/products/:id",
    exact: false,
    component: SingleProduct,
    private: false,
    admin: false,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
    private: false,
    admin: false,
  },
  {
    path: "/register",
    exact: false,
    component: Register,
    private: false,
    admin: false,
  },
  {
    path: "/cart/:id?",
    exact: false,
    component: CartPage,
    private: false,
    admin: false,
  },
  {
    path: "/shipping",
    exact: false,
    component: ShippingPage,
    private: true,
    admin: false,
  },
  {
    path: "/checkout",
    exact: false,
    component: CheckoutPage,
    private: true,
    admin: false,
  },
  {
    path: "/profile",
    exact: false,
    component: UserUpdate,
    private: true,
    admin: false,
  },
  {
    path: "*",
    exact: false,
    component: ErrorPage,
    private: false,
    admin: false,
  },
];

const PrivateRoute = (props: RouteProps) => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return userInfo?._id.length !== 0 ? (
          children
        ) : (
          <Redirect to="/"></Redirect>
        );
      }}
    ></Route>
  );
};

const AdminRoute = (props: RouteProps) => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return userInfo?.role === "admin" ? (
          children
        ) : (
          <Redirect to="/"></Redirect>
        );
      }}
    ></Route>
  );
};

export default function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          const RouteType = route.admin
            ? AdminRoute
            : route.private
            ? PrivateRoute
            : Route;
          return (
            <RouteType key={index} path={route.path} exact={route.exact}>
              <route.component />
            </RouteType>
          );
        })}
      </Switch>
    </Layout>
  );
}
