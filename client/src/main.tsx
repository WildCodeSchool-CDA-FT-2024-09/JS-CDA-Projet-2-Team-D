import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import connection from "./services/connection";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.tsx";
import ManageUser from "./pages/administrator/user/ManageUser.tsx";
import CreateUser from "./pages/administrator/user/CreateUser.tsx";
import UpdateUser from "./pages/administrator/user/UpdateUser.tsx";
import HomePageCommission from "./pages/homePageCommission/HomePageCommission.tsx";
import ManageCategory from "./pages/accountant/category/ManageCategory.tsx";
import Invoice from "./pages/commission/Invoice.tsx";
import Home from "./pages/Home.tsx";
import Administrator from "./pages/administrator/Administrator.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "administrator",
        element: (
          <RoleProtectedRoute requiredRole="1">
            <Outlet />
          </RoleProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Administrator />,
          },
          {
            path: "user",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageUser />,
              },
              {
                path: "add",
                element: <CreateUser />,
              },
              {
                path: "edit/:userId",
                element: <UpdateUser />,
              },
            ],
          },
        ],
      },
      {
        path: "accountant",
        element: (
          <RoleProtectedRoute requiredRole="2">
            <Outlet />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "category",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ManageCategory />,
              },
            ],
          },
        ],
      },
      {
        path: "commission",
        element: (
          <RoleProtectedRoute requiredRole="3">
            <Outlet />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: "invoice",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Invoice />,
              },
            ],
          },
          {
            path: ":commissionId",
            element: <HomePageCommission />,
          },
          {
            index: true,
            element: <HomePageCommission />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={connection}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
