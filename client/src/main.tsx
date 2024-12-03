import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import connection from "./services/connection";
import App from "./App.tsx";
import ManageUser from "./pages/administrator/user/ManageUser.tsx";
import HomePageCommission from "./pages/homePageCommission/HomePageCommission.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h1>Home page</h1>,
      },
      {
        path: "administrator",
        element: <Outlet />,
        children: [
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
            index: true,
            element: <h1>Comptable</h1>,
          },
        ],
      },
      {
        path: "commission",
        element: <Outlet />,
        children: [
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
