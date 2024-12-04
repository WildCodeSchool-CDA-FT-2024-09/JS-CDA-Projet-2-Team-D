import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import connection from "./services/connection";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ManageUser from "./pages/administrator/user/ManageUser.tsx";
import Invoice from "./pages/commission/Invoice.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
            path: "invoice",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Invoice />,
              },
            ],
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
