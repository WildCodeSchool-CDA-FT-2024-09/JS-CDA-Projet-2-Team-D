import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import connection from "./services/connection";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ManageUser from "./pages/administrator/user/ManageUser.tsx";
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
        element: <Outlet />,
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
            ],
          },
        ],
      },
      {
        path: "accountant",
        element: <Outlet />,
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
        element: <Outlet />,
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
